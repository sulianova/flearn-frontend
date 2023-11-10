import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionBS, TActionS } from './types';

export { type ICourseData, type ICourseDataDB } from './types';

class CourseService {
  public async getCourseBS(props: {
    filter: { id?: string, ids?: string[], userId?: string }
  }) {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetchUsers = async () => {
        try {
          mainSubject.next(null);
          const courses = await this._fetch(props);
          mainSubject.next({ courses });
        } catch (err) {
          mainSubject.next(err as Error);
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

  private async _fetch(props: {
    filter: { id?: string, ids?: string[], userId?: string },
  }) {
    try {
      if (props.filter.id) {
        return [await dataService.course.get(props.filter.id)];
      }
      return await dataService.course.getAll({ ids: props.filter.ids, userId: props.filter.userId });
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch courses`, { props, error });
      throw error;
    }
  }

  private _courseS = new Subject<TActionS>();
}

export const courseService = new CourseService;
