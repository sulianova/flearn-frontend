import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';
import { localFilesServise } from 'services/localFiles.service';
import { ECommonErrorTypes } from 'types';

import { getData } from './data';
import useCourses from './useCourses';
import type { IFetchCourseProps, TSource, TActionBS, TActionS, TCourseError, ICourseData } from './types';

export { type ICourseData, type ICourseDataDB, type TCourseState } from './types';

class CourseService {
  public useCourses = useCourses;
  public sourceBS = new BehaviorSubject<TSource>('remote');
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

  private errorToType(error: Error): TCourseError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TCourseError;

    return errorType;
  }

  private async _fetch(props: IFetchCourseProps) {
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

  private _courseS = new Subject<TActionS>();
}

export const courseService = new CourseService;
export default CourseService;
