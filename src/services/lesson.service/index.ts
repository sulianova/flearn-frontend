import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import { allLessons, getData } from './data';
import { ECommonErrorTypes } from 'types';
import type { IFetchLessonsProps, TActionBS, TActionS, TLessonError } from './types';
import { localFilesServise } from 'services/localFiles.service';

export type { ILessonData, TActionS, ILessonDataDB, TLessonState, IFetchLessonsProps } from './types';

class LessonService {
  public getLessonBS(props: IFetchLessonsProps) {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetchUsers = async () => {
        try {
          mainSubject.next(null);
          const lessons = await this._fetch(props);
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
          fetchUsers();

          const usersUpdatedSubscription = this._lessonS.subscribe(async e => {
            try {
              fetchUsers();
            } catch (err) {
              /* error already handled */
            }
          });

          const mainSubjectSubscription = mainSubject.subscribe(observer);
          return {
            ...mainSubjectSubscription,
            unsubscribe: () => {
              mainSubjectSubscription?.unsubscribe();
              usersUpdatedSubscription?.unsubscribe();
            },
          };
        },
      } as BehaviorSubject<TActionBS>;
    } catch (err) {
      console.error('Failed to subscribe for lessons', { props });
      throw err;
    }
  }

  public async upload(props: { courseId: string, lessonId: string }) {
    try {
      const lessonLocalDB = getData(props.courseId, props.lessonId);
      if (!lessonLocalDB) {
        throw new Error('No local lesson data');
      }
      const lessonLocal = await localFilesServise.Lesson.localToFR(lessonLocalDB);
      await dataService.lesson.set(lessonLocal.courseId, lessonLocal.id, lessonLocal);
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to upload lesson`, { props, error });
      throw error;
    }
  }

  public _uploadAll() {
    Promise.all(allLessons.map(l => this.upload({ courseId: l.courseId, lessonId: l.id })));
  }

  private errorToType(error: Error): TLessonError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TLessonError;

    return errorType;
  }

  private async _fetch(props: IFetchLessonsProps) {
    try {
      if (props.source === 'local' && props.filter.lessonId) {
        const lessonLocalDB = getData(props.filter.courseId, props.filter.lessonId);
        if (lessonLocalDB) {
          const lessonLocal = await localFilesServise.Lesson.localToFR(lessonLocalDB);
          if (lessonLocal) {
            return [lessonLocal];
          }
        }
      }
      return await dataService.lesson.getAll(props.filter);
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch lessons`, { props, error });
      throw error;
    }
  }

  private _lessonS = new Subject<TActionS>();
}

export const lessonService = new LessonService;
export default LessonService;

(window as any).lessonService = lessonService;
