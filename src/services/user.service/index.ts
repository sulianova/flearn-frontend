import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionBS, TActionS } from './types';

import useAuthedUser from './useAuthUser';
import { authService } from 'services';

export { type IUserData, type IUserDataDB } from './types';

class UserService {
  public useAuthedUser = useAuthedUser;
  public async getUserBS(props: {
    filter: { id?: string, ids?: string[] }
  }) {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetchUsers = async () => {
        try {
          mainSubject.next(null);
          const users = await this._fetch(props);
          mainSubject.next({ users });
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

          const usersUpdatedSubscription = this._usersS.subscribe(async e => {
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
      console.error('Failed to subscribe for users', { props });
      throw err;
    }
  }

  public async getAuthenticatedUser() {
    try {
      const fbUser = authService.user;
      if (!fbUser) {
        return null;
      }

      const users = await this._fetch({ filter: { id: fbUser.uid }});
      const user = users[0];
      if (!user) {
        throw new Error('Does not have user in database');
      }

      return user;
    } catch (err) {
      console.log('Failed to get authenticated user', { err });
      throw err;
    }
  }

  private async _fetch(props: {
    filter: { id?: string, ids?: string[] },
  }) {
    try {
      if (props.filter.id) {
        return [await dataService.user.get(props.filter.id)];
      }
      return await dataService.user.getAll({ ids: props.filter.ids });
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch users`, { props, error });
      throw error;
    }
  }

  private _usersS = new Subject<TActionS>();
}

export const userService = new UserService;
export default UserService;
