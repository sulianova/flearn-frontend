import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionS } from './types';
import type { IHomeworkDataWPopulate, IUserData } from 'types';
import { ECommonErrorTypes } from 'types';

class HomeworkService {
  async getHomeworkBS(props: {
    filter: { courseId: string, lessonId?: string, userId?: string, id?: string }
    populate?: { user?: boolean }
  }) {
    try {
      type TAction = null | { homeworks: IHomeworkDataWPopulate[] } | Error;
      const mainSubject = new BehaviorSubject<TAction>(null);

      const fetchHomeworks = async () => {
        try {
          mainSubject.next(null);
          const r = await this._fetch(props);
          mainSubject.next(r);
        } catch (err) {
          mainSubject.next(err as Error);
        }
      };

      return {
        ...mainSubject,
        subscribe: (
          observer?:
            | NextObserver<TAction>
            | ErrorObserver<TAction>
            | CompletionObserver<TAction>
            | undefined
        ) => {
          fetchHomeworks();

          const homeworksUpdatedSubscription = this._homeworkS.subscribe(async e => {
            try {
              fetchHomeworks();
            } catch (err) {
              /* error already handled */
            }
          });

          const mainSubjectSubscription = mainSubject.subscribe(observer);
          return {
            ...mainSubjectSubscription,
            unsubscribe: () => {
              mainSubjectSubscription?.unsubscribe();
              homeworksUpdatedSubscription?.unsubscribe();
            },
          };
        },
      } as BehaviorSubject<TAction>;
    } catch (err) {
      console.error('Failed to subscribe for homeworks', { props });
      throw err;
    }
  }

  async _fetch(props: {
    filter: { courseId: string, lessonId?: string, userId?: string, id?: string }
    populate?: { user?: boolean }
  }) {
    try {
      const homeworksData = await dataService.homework.getAll(props.filter);

      // populate
      let populateMap: Map<string, IHomeworkDataWPopulate['populate']>;
      if (props.populate) {
        populateMap = new Map();

        let populateUserMap: Map<string, IUserData>;
        if (props.populate.user) {
          const userIds = [...new Set(homeworksData.map(l => l.userId))];
          const usersData = await dataService.user.getAll(userIds);
          populateUserMap = new Map(usersData.map(c => [c.id, c] as const));
        }
        // add here other populated values

        // fill populate map
        for (const homework of homeworksData) {
          populateMap.set(homework.id, {
            ...populateUserMap! && { user: populateUserMap.get(homework.userId) }
          });
        }
      }

      const homeworks: IHomeworkDataWPopulate[] = homeworksData.map(homework => ({
        homework,
        ...populateMap && { populate: populateMap.get(homework.id) },
      }));

      return { homeworks };
    } catch (err) {
      // tslint:disable-next-line
      console.log(`Failed to fetch homeworks`, { props, err });
      throw err;
    }
  }

  public errorToType(error: Error) {
    const errorIsUnknown = !([...Object.values(ECommonErrorTypes)] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes;

    return errorType;
  }

  private _homeworkS = new Subject<TActionS>;
}

export const homeworkService = new HomeworkService();
