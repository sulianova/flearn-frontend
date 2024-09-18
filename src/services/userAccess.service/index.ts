import { BehaviorSubject, merge, Subject } from 'rxjs';

import { authService } from 'services/auth.service';
import { dataService } from 'services/data.service';
import { locationService } from 'services/location.service';

import { type TAccess } from './types';
import useAccess from './useAccess';
import { ISubscription } from 'services/data.service/Subscription/types';

export { type TAccess, type TAccessData } from './types';

class UserAccessService {
  public useAccess = useAccess;
  public accessS = new Subject<{ type: 'updated' }>();
  public _subscriptionBS = new BehaviorSubject<ISubscription | null>(null);

  constructor() {
    this.initSubscriptionBS();
  }

  public get access() {
    return this._subscriptionBS.getValue()?.access ?? 'FREE';
  }

  public async add(email: string, accessValue: Exclude<TAccess, 'FREE'>) {
    await dataService.subscription.add(email, accessValue);
    this.accessS.next({ type: 'updated' });
  }

  protected initSubscriptionBS() {
    const refetch = () => {
      const authedUser = authService.user;
      const section = locationService.URLSection;
      if (!authedUser) {
        this._subscriptionBS.next(null);
        return;
      }

      dataService.subscription.get(authedUser.email)
        .then(s => {
          this._subscriptionBS.next(s);
        })
        .catch(error => {
          console.log('Failed to fetch subscription for _subscriptionBS', { error, authedUser, section });
          this._subscriptionBS.next(null);
        });
    }

    merge(
      this.accessS,
      authService.firebaseUserBS,
    ).subscribe(refetch);
  }
}

export const userAccessService = new UserAccessService();
export default UserAccessService;
