import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';
import { localFilesServise } from 'services/localFiles.service';
import { ECommonErrorTypes } from 'types';

import { allCourses, getData } from './data';
import { type IFetchCourseProps, type TSource, type TActionBS, type TActionS, type TCourseError, ICourseData } from './types/index';

import useCourses from './useCourses';
import useCurrentCourse from './useCurrentCourse';
import useUserCourses from './useUserCourses';
import { authService } from 'services';
import { userAccessService } from 'services/userAccess.service';
import { locationService } from 'services/location.service';

export * from './types/index';

class CourseService {
  public useCourses = useCourses;
  public useCurrentCourse = useCurrentCourse;
  public useUserCourses = useUserCourses;

  public sourceBS = new BehaviorSubject<TSource>('remote');

  constructor() {
    this.initCurrentCourseBS();
    this.initUserCoursesBS();
  }

  public getCourseBS(props: IFetchCourseProps) {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetch = async () => {
        try {
          mainSubject.next(null);
          const courses = await this._fetch(props);
          mainSubject.next({ courses });
        } catch (err) {
          err = err as Error;
          const error = Object.assign(err as Error, { ErrorType: this.errorToType(err as Error )});
          mainSubject.next(error);
        }
      };

      return {
        ...mainSubject,
        subscribe: (
          observer?:
            | NextObserver<TActionBS>
            | ErrorObserver<TActionBS>
            | CompletionObserver<TActionBS>
            | undefined
        ) => {
          fetch();

          const dependenciesSubscription = merge(
            this._courseS,
            this.sourceBS,
          ).subscribe(fetch);

          const mainSubjectSubscription = mainSubject.subscribe(observer);
          return {
            ...mainSubjectSubscription,
            unsubscribe: () => {
              mainSubjectSubscription?.unsubscribe();
              dependenciesSubscription?.unsubscribe();
            },
          };
        },
      } as BehaviorSubject<TActionBS>;
    } catch (err) {
      console.error('Failed to subscribe for courses', { props });
      throw err;
    }
  }

  public changeSource(source: TSource) {
    this.sourceBS.next(source);
  }

  public async upload(id: string) {
    try {
      const courseLocalDB = getData([id]).at(0);
      if (!courseLocalDB) {
        throw new Error('No local course data');
      }
      const courseLocal = await localFilesServise.Course.localToFR(courseLocalDB);
      await dataService.course.set(courseLocal.id, courseLocal);
    } catch (error) {
      console.log('Failed to upload course');
      throw error;
    }
  }

  public _uploadAll() {
    Promise.all(allCourses.map(c => this.upload(c.id)));
  }

  private errorToType(error: Error): TCourseError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TCourseError;

    return errorType;
  }

  public async _fetch(props: IFetchCourseProps) {
    try {
      const source = this.sourceBS.getValue();
      if (source === 'local' && props.ids) {
        const courseLocalDBs = getData(props.ids);
        return Promise.all(courseLocalDBs.map(courseLocalDB => localFilesServise.Course.localToFR(courseLocalDB)));
      }
      return await dataService.course.getAll({ ids: props.ids, userId: props.userId });
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch courses`, { props, error });
      throw error;
    }
  }

  protected initCurrentCourseBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      if (section.name !== 'Course' && section.name !== 'Profile' && section.name !== 'Study') {
        this._currentCourseBS.next(null);
        return;
      }

      this._fetch({ ids: [section.params.courseId] })
        .then(courses => {
          const course = courses.at(0);
          if (!course) {
            console.log('Failed to fetch current course', { course, section });
            this._currentCourseBS.next(null);
            return;
          }

          this._currentCourseBS.next(course);
        })
        .catch(error => {
          console.log('Failed to fetch current course', { error, section });
          this._currentCourseBS.next(null);
        })
    };

    merge(
      this._courseS,
      this.sourceBS,
      locationService.URLSectionBS,
    ).subscribe(refetch);
  }

  protected initUserCoursesBS() {
    const refetch = () => {
      const user = authService.user;
      if (!user) {
        this._userCoursesBS.next(null);
        return;
      }

      this._fetch({ userId: user.uid })
        .then(courses => {
          this._userCoursesBS.next(courses);
        })
        .catch(error => {
          console.log('Failed to fetch courses for userCoursesBS', { user, error });
          this._userCoursesBS.next(null);
        })
    };

    merge(
      this._courseS,
      this.sourceBS,
      authService.firebaseUserBS,
      userAccessService.accessS,
    ).subscribe(refetch);
  }

  protected _courseS = new Subject<TActionS>();
  protected _currentCourseBS = new BehaviorSubject<ICourseData | null>(null);
  protected _userCoursesBS = new BehaviorSubject<ICourseData[] | null>(null);
}

export const courseService = new CourseService;
export default CourseService;
(window as any).courseService = courseService;
