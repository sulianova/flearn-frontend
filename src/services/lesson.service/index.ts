import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';
import { locationService } from 'services/location.service';
import { authService } from 'services';
import { userCourseProgressService } from 'services/userCourseProgress.service';

import { allLessons, getData } from './data';
import { ECommonErrorTypes } from 'types';
import { TSource, type IFetchLessonsProps, type ILessonData, type TActionBS, type TActionS, type TLessonError } from './types';
import { localFilesServise } from 'services/localFiles.service';

import useLessons from './useLessons';
import useTopicLessons from './useTopicLessons';
import useCurrentLesson from './useCurrentLesson';
import useCourseLessons from './useCourseLessons';
import { userAccessService } from 'services/userAccess.service';

export type { ILessonData, TActionS, ILessonDataDB, TLessonState, IFetchLessonsProps } from './types';

class LessonService {
  public useLessons = useLessons;
  public useTopicLessons = useTopicLessons;
  public useCurrentLesson = useCurrentLesson;
  public useCourseLessons = useCourseLessons;
  public sourceBS = new BehaviorSubject<TSource>('remote');

  constructor() {
    this.initCurrentLessonBS();
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

  protected initCurrentLessonBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      const courseLessons = this._courseLessonsBS.getValue();

      if (section.name !== 'Study' || !courseLessons) {
        this._currentLessonBS.next(null);
        return;
      }

      const currentLesson = courseLessons.find(l => l.id === section.params.lessonId);
      if (!currentLesson) {
        this._currentLessonBS.next(null);
        return;
      }

      this._currentLessonBS.next(currentLesson);
    };

    merge(
      this._courseLessonsBS,
      locationService.URLSectionBS,
    ).subscribe(refetch);
  }

  protected initCourseLessonsBS() {
    const refetch = () => {
      const section = locationService.URLSection;
      const authedUser = authService.user;
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
              const sortedA = lessons.slice()
                .sort((a, b) => {
                  const key = a.topicOrder != b.topicOrder ? 'topicOrder' : 'orderInTopic';
                  return a[key] - b[key];
                });

              const firstNotLearnedLesson = sortedA.find(l => !progress[l.id]);

              this._courseLessonsBS.next(
                lessons
                  .map(lesson => {
                    const solved = progress?.[lesson.id]?.solved ?? false;
                    const canBeAccessed =
                      !lesson.isFree && currentCourseAccess === 'FREE' ? false
                      : !firstNotLearnedLesson ? true
                      : firstNotLearnedLesson.topicOrder === lesson.topicOrder
                        ? firstNotLearnedLesson.orderInTopic >= lesson.orderInTopic
                        : firstNotLearnedLesson.topicOrder > lesson.topicOrder;
                    return { ...lesson, canBeAccessed, solved };
                  })
                  .sort((a, b) => {
                    const key = a.topicOrder != b.topicOrder ? 'topicOrder' : 'orderInTopic';
                    return a[key] - b[key];
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
      authService.firebaseUserBS,
      userCourseProgressService.userCourseProgresS,
      userAccessService._currentCourseAccessBS,
    ).subscribe(refetch);
  }

  protected _lessonS = new Subject<TActionS>();
  protected _currentLessonBS = new BehaviorSubject<ILessonData | null>(null);
  protected _courseLessonsBS = new BehaviorSubject<(ILessonData & { solved: boolean, canBeAccessed: boolean })[] | null>(null);
}

export const lessonService = new LessonService;
export default LessonService;

(window as any).lessonService = lessonService;
