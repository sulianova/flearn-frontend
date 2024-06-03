import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import { ECommonErrorTypes } from 'types';
import type { TActionBS, TActionS, TLessonError } from './types';

export type { ILessonData, TActionS, ILessonDataDB, TLessonState } from './types';

class LessonService {
  public getLessonBS(props: {
    filter: {
      courseId: string
      lessonId?: string
      topic?: string
    },
  }) {
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

  private errorToType(error: Error): TLessonError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TLessonError;

    return errorType;
  }

  private async _fetch(props: {
    filter: {
      courseId: string
      lessonId?: string
      topic?: string
    },
  }) {
    try {
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
