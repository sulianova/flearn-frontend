import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';
import { locationService } from 'services/location.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { userAccessService } from 'services/userAccess.service';
import { userService } from 'services/user.service';
import { localFilesServise } from 'services/localFiles.service';

import { allLessons, getData } from './data';
import { ECommonErrorTypes } from 'types';
import { TSource, type IFetchLessonsProps, type ILessonData, type TActionBS, type TActionS, type TLessonError } from './types';

import useLessons from './useLessons';
import useTopicLessons from './useTopicLessons';
import useCurrentLesson from './useCurrentLesson';
import useNextLesson from './useNextLesson';
import useCourseLessons from './useCourseLessons';

export type { ILessonData, TActionS, ILessonDataDB, TLessonState, IFetchLessonsProps } from './types';

class LessonService {
  public useLessons = useLessons;
  public useTopicLessons = useTopicLessons;
  public useCurrentLesson = useCurrentLesson;
  public useNextLesson = useNextLesson;
  public useCourseLessons = useCourseLessons;
  public sourceBS = new BehaviorSubject<TSource>('remote');

  constructor() {
    this.initCurrentAndNextLessonBS();
    this.initCourseLessonsBS();
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

  public async upload(id: string) {
    try {
      const lessonLocalDB = getData({ id }).at(0);
      if (!lessonLocalDB) {
        throw new Error('No local lesson data');
      }
      const lessonLocal = await localFilesServise.Lesson.localToFR(lessonLocalDB);
      await dataService.lesson.set(lessonLocal.courseId, lessonLocal.id, lessonLocal);
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to upload lesson`, { id, error });
      throw error;
    }
  }

  public _uploadAll() {
    Promise.all(allLessons.map(l => this.upload(l.id)));
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
  }

  protected errorToType(error: Error): TLessonError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TLessonError;

    return errorType;
  }

  protected initCurrentAndNextLessonBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      const courseLessons = this._courseLessonsBS.getValue();

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

  protected initCourseLessonsBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      const authedUser = userService.authedUser;
      if ((section.name !== 'Profile' && section.name !== 'Study') || !authedUser) {
        this._courseLessonsBS.next(null);
        return;
      }

      const { courseId } = section.params;
      const currentCourseAccess = userAccessService.currentCourseAccess;

      dataService.userCourseProgress.get(courseId, authedUser.email)
        .then(progress =>
          this.fetch({ courseId })
            .then(lessons => {
              const sortedLessons = lessons.slice()
                .sort((a, b) => {
                  const key = a.topicOrder != b.topicOrder ? 'topicOrder' : 'orderInTopic';
                  return a[key] - b[key];
                });

              const firstNotLearnedLesson = sortedLessons.find(l => !progress[l.id]);

              this._courseLessonsBS.next(
                sortedLessons
                  .map(lesson => {
                    const solved = progress?.[lesson.id]?.solved ?? false;
                    const canBeAccessed =
                      authedUser.role === 'support' ? true
                      : !lesson.isFree && currentCourseAccess === 'FREE' ? false
                      : !firstNotLearnedLesson ? true
                      : firstNotLearnedLesson.topicOrder === lesson.topicOrder
                        ? firstNotLearnedLesson.orderInTopic >= lesson.orderInTopic
                        : firstNotLearnedLesson.topicOrder > lesson.topicOrder;
                    return { ...lesson, canBeAccessed, solved };
                  })
              );
            })
            .catch(error => {
              console.log('Failed to fetch topic lessons', { error });
            })
        )
        .catch(error => {
          console.log('Failed to fetch topic lessons', { error });
        });
    };

    merge(
      this._lessonS,
      this.sourceBS,
      locationService.URLSectionBS,
      userService.authedUserBS,
      userCourseProgressService.userCourseProgresS,
      userAccessService._currentCourseAccessBS,
    ).subscribe(refetch);
  }

  protected _lessonS = new Subject<TActionS>();
  protected _currentLessonBS = new BehaviorSubject<ILessonData | null>(null);
  protected _nextLessonBS = new BehaviorSubject<ILessonData | null>(null);
  protected _courseLessonsBS = new BehaviorSubject<(ILessonData & { solved: boolean, canBeAccessed: boolean })[] | null>(null);
}

export const lessonService = new LessonService;
export default LessonService;

(window as any).lessonService = lessonService;
