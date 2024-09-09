import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';
import { locationService } from 'services/location.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { userAccessService } from 'services/userAccess.service';
import { userService } from 'services/user.service';
import { localFilesServise } from 'services/localFiles.service';
import { localStorageService } from 'services/localStorage.service';

import { getData } from './data';
import { ECommonErrorTypes } from 'types';
import { TCourseLessonsBSDependencies, TCourseLessonsBSValue, TCourseLessonsRawBSDependencies, TCourseLessonsRawBSValue, TSource, type IFetchLessonsProps, type ILessonData, type TActionBS, type TActionS, type TLessonError } from './types';

import useLessons from './useLessons';
import useTopicLessons from './useTopicLessons';
import useCurrentLesson from './useCurrentLesson';
import useNextLesson from './useNextLesson';
import useCourseLessons from './useCourseLessons';

export type { ILessonData, TActionS, ILessonDataDB, IFetchLessonsProps } from './types';

class LessonService {
  public useLessons = useLessons;
  public useTopicLessons = useTopicLessons;
  public useCurrentLesson = useCurrentLesson;
  public useNextLesson = useNextLesson;
  public useCourseLessons = useCourseLessons;
  public sourceBS: BehaviorSubject<TSource>;

  constructor() {
    this.sourceBS = new BehaviorSubject<TSource>(localStorageService.get(this._lsSourceKey) ?? 'remote');
    this.initCurrentAndNextLessonBS();
    this.initCourseLessonsRawBS();
    this.initCourseLessonsBS()
  }

  public getLessonBS(props: IFetchLessonsProps) {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetch = async () => {
        try {
          mainSubject.next(null);
          const lessons = await this.fetch(props);
          mainSubject.next({ lessons });
        } catch (err) {
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
            this._lessonS,
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
      console.error('Failed to subscribe for lessons', { props });
      throw err;
    }
  }

  public async upload(props: { courseId?: string, id?: string }) {
    try {
      const { courseId, id } = props;

      const lessonsDB = getData({ courseId, id })
      if (!lessonsDB.length) {
        throw new Error('No local data');
      }

      const lessons = await Promise.all(lessonsDB.map(l => localFilesServise.Lesson.localToFR(l)));
      await Promise.all(lessons.map(l => dataService.lesson.set(l.courseId, l.id, l)));
      this._lessonS.next({ type: 'updated' });
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to upload lessons`, { props, error });
      throw error;
    }
  }

  public async fetchNextLesson(lesson: ILessonData) {
    try {
      const nextInTopickLesson = (await this.fetch({ courseId: lesson.courseId, topicOrder: lesson.topicOrder, orderInTopic: lesson.orderInTopic + 1 }))[0] as ILessonData | undefined;
      if (nextInTopickLesson) {
        return nextInTopickLesson;
      }
      const firstInNextTopickLesson = (await this.fetch({ courseId: lesson.courseId, topicOrder: lesson.topicOrder + 1, orderInTopic: 1 }))[0] as ILessonData | undefined;
      if (firstInNextTopickLesson) {
        return firstInNextTopickLesson;
      }
      return null;
    } catch (err) {
      console.log('Failed to get next lesson', { err, lesson });
      throw err;
    }
  }

  public async fetch(filter: IFetchLessonsProps) {
    try {
      if (this.sourceBS.getValue() === 'remote') {
        return await dataService.lesson.getAll(filter);
      }
      const lessonsLocalDB = getData(filter);
      return Promise.all(lessonsLocalDB.map(lessonDB => localFilesServise.Lesson.localToFR(lessonDB)));
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch lessons`, { filter, error });
      throw error;
    }
  }

  public changeSource(source: TSource) {
    this.sourceBS.next(source);
    localStorageService.set(this._lsSourceKey, source);
  }

  protected errorToType(error: Error): TLessonError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TLessonError;

    return errorType;
  }

  protected initCurrentAndNextLessonBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      const courseLessons = this._courseLessonsBS.getValue().lessons;

      if (section.name !== 'Study' || !courseLessons) {
        this._currentLessonBS.next(null);
        this._nextLessonBS.next(null);
        return;
      }

      const currentLesson = courseLessons.find(l => l.id === section.params.lessonId);
      if (!currentLesson) {
        this._currentLessonBS.next(null);
        this._nextLessonBS.next(null);
        return;
      }

      const nextInTopickLesson = courseLessons.find(l => l.topicOrder === currentLesson.topicOrder && l.orderInTopic === currentLesson.orderInTopic + 1);
      const firstInNextTopickLesson = courseLessons.find(l => l.topicOrder === currentLesson.topicOrder + 1 && l.orderInTopic === 1);

      this._currentLessonBS.next(currentLesson);
      this._nextLessonBS.next(nextInTopickLesson ?? firstInNextTopickLesson ?? null)
    };

    merge(
      this._courseLessonsBS,
      locationService.URLSectionBS,
    ).subscribe(refetch);
  }

  protected initCourseLessonsRawBS() {
    const refetch = () => {
      const dependencies: TCourseLessonsRawBSDependencies = {
        source: this.sourceBS.getValue(),
        section: locationService.URLSection,
      };
      console.log('initCourseLessonsRawBS refetch', { dependencies });
      if ((dependencies.section.name !== 'Course' && dependencies.section.name !== 'Profile' && dependencies.section.name !== 'Study')) {
        console.log('initCourseLessonsRawBS refetch 1');
        
        this._courseLessonsRawBS.next({ lessons: null, dependencies });
        return;
      }

      // do not refetch
      const prevDependencies = this._courseLessonsRawBS.getValue().dependencies;
      if (prevDependencies
        && prevDependencies.source === dependencies.source
        && (prevDependencies.section.name === 'Course' || prevDependencies.section.name === 'Profile' || prevDependencies.section.name === 'Study')
        && prevDependencies.section.params.courseId === dependencies.section.params.courseId
      ) {
        console.log('initCourseLessonsRawBS refetch 2');
        return;
      }

      if (prevDependencies
        && prevDependencies.source !== dependencies.source
      ) {
        console.log('initCourseLessonsRawBS refetch 3');
        // trigger spinner
        this._courseLessonsRawBS.next({ lessons: null, dependencies });
      } else if (
        prevDependencies
        && (prevDependencies.section.name === 'Course' || prevDependencies.section.name === 'Profile' || prevDependencies.section.name === 'Study')
        && prevDependencies.section.params.courseId !== dependencies.section.params.courseId
      ) {
        console.log('initCourseLessonsRawBS refetch 4');
        // trigger spinner
        this._courseLessonsRawBS.next({ lessons: null, dependencies });
      }

      const courseId = dependencies.section.params.courseId;
      this.fetch({ courseId })
          .then(lessons => {
            console.log('initCourseLessonsRawBS refetch 5', { lessons });
            this._courseLessonsRawBS.next({ lessons, dependencies })
          })
          .catch(error => {
            console.log('Failed to fetch course lessons', { error });
          });
    };

    merge(
      this._lessonS,
      this.sourceBS,
      locationService.URLSectionBS,
    ).subscribe(refetch);
  }

  protected initCourseLessonsBS() {
    const refetch = () => {
      const dependencies: TCourseLessonsBSDependencies = {
        authedUser: userService.authedUser,
        courseAccess: userAccessService.currentCourseAccess,
      };
      console.log('initCourseLessonsBS refetch', { dependencies });
      const { lessons, dependencies: rawDependencies } = this._courseLessonsRawBS.getValue();
      if (!dependencies.authedUser || !lessons || !rawDependencies || (rawDependencies.section.name !== 'Course' && rawDependencies.section.name !== 'Profile' && rawDependencies.section.name !== 'Study')) {
        this._courseLessonsBS.next({ lessons: null, dependencies });
        console.log('initCourseLessonsBS refetch', { dependencies });
        return;
      }

      const courseId = rawDependencies.section.params.courseId;
      dataService.userCourseProgress.get(courseId, dependencies.authedUser.email)
        .then(progress => {
          const sortedLessons = lessons.slice()
            .sort((a, b) => {
              const key = a.topicOrder !== b.topicOrder ? 'topicOrder' : 'orderInTopic';
              return a[key] - b[key];
            });

          const firstNotLearnedLesson = sortedLessons.find(l => !progress[l.id]);

          this._courseLessonsBS.next(
            {
              lessons: sortedLessons
                .map(lesson => {
                  const solved = progress?.[lesson.id]?.solved ?? false;
                  const canBeAccessed =
                    dependencies.authedUser!.role === 'support' ? true
                    : !lesson.isFree && dependencies.courseAccess! === 'FREE' ? false
                    : !firstNotLearnedLesson ? true
                    : firstNotLearnedLesson.topicOrder === lesson.topicOrder
                      ? firstNotLearnedLesson.orderInTopic >= lesson.orderInTopic
                      : firstNotLearnedLesson.topicOrder > lesson.topicOrder;
                  return { ...lesson, canBeAccessed, solved };
                }),
              dependencies,
            }
          );
        })
        .catch(error => {
          console.log('Failed to fetch topic lessons', { error });
        });
    };

    merge(
      this._lessonS,
      this._courseLessonsRawBS,
      userService.authedUserBS,
      userCourseProgressService.userCourseProgresS,
      userAccessService._currentCourseAccessBS,
    ).subscribe(refetch);
  }

  protected _lsSourceKey = 'LessonServiceSource';
  protected _lessonS = new Subject<TActionS>();
  protected _currentLessonBS = new BehaviorSubject<ILessonData | null>(null);
  protected _nextLessonBS = new BehaviorSubject<ILessonData | null>(null);
  protected _courseLessonsRawBS = new BehaviorSubject<TCourseLessonsRawBSValue>({ lessons: null, dependencies: null });
  protected _courseLessonsBS = new BehaviorSubject<TCourseLessonsBSValue>({ lessons: null, dependencies: null });
}

export const lessonService = new LessonService();
export default LessonService;

(window as any).lessonService = lessonService;
