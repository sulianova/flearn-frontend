import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';

import { allLessons, getData } from './data';
import { ECommonErrorTypes } from 'types';
import { TSource, type IFetchLessonsProps, type ILessonData, type TActionBS, type TActionS, type TLessonError } from './types';
import { localFilesServise } from 'services/localFiles.service';
import useLessons from './useLessons';

export type { ILessonData, TActionS, ILessonDataDB, TLessonState, IFetchLessonsProps } from './types';

class LessonService {
  public useLessons = useLessons;
  public sourceBS = new BehaviorSubject<TSource>('remote');
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
      const lessonLocalDB = getData(id);
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
      const source = this.sourceBS.getValue();
      if (source === 'local' && filter.id) {
        const lessonLocalDB = getData(filter.id);
        if (lessonLocalDB) {
          const lessonLocal = await localFilesServise.Lesson.localToFR(lessonLocalDB);
          if (lessonLocal) {
            return [lessonLocal];
          }
        }
      }
      return await dataService.lesson.getAll(filter);
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch lessons`, { filter, error });
      throw error;
    }
  }

  public changeSource(source: TSource) {
    this.sourceBS.next(source);
  }

  private errorToType(error: Error): TLessonError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TLessonError;

    return errorType;
  }

  private _lessonS = new Subject<TActionS>();
}

export const lessonService = new LessonService;
export default LessonService;

(window as any).lessonService = lessonService;
