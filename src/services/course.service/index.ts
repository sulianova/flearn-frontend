import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionBS, TActionS, TCourseError, TCourseState } from './types';
import { ECommonErrorTypes } from 'types';

export { type ICourseData, type ICourseDataDB, type TCourseState } from './types';

class CourseService {
  public getCourseBS(props?: {
    filter?: { id?: string, ids?: string[], userId?: string }
  }) {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetchUsers = async () => {
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
          fetchUsers();

          const usersUpdatedSubscription = this._courseS.subscribe(async e => {
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
      console.error('Failed to subscribe for courses', { props });
      throw err;
    }
  }

  private errorToType(error: Error): TCourseError {
    const errorIsUnknown = !([ECommonErrorTypes.DataIsCorrupted, ECommonErrorTypes.FailedToFindData, ECommonErrorTypes.Other] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as TCourseError;

    return errorType;
  }

  private async _fetch(props?: {
    filter?: { id?: string, ids?: string[], userId?: string },
  }) {
    try {
      if (props?.filter?.id) {
        return [await dataService.course.get(props.filter.id)];
      }
      return await dataService.course.getAll({ ids: props?.filter?.ids, userId: props?.filter?.userId });
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch courses`, { props, error });
      throw error;
    }
  }

  private _courseS = new Subject<TActionS>();
}

export const courseService = new CourseService;
