import { v4 } from 'uuid';

import { ECollections, firebaseService } from 'services/firebase.service';
import { addDays } from 'utils';

import { converter } from './converter';
import type { ISubscription, ISubscriptionDB, TAccess } from './types';

const accessOrder: Record<TAccess, number> = {
  'FREE': 0,
  'BASE': 10,
  'OPTIMAL': 20,
  'EXTENDED': 30,
};

class Subscription {
  public async getAccess(email: string): Promise<TAccess> {
    try {
      return (await this.get(email))?.access ?? 'FREE';
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get Access: ${error.message}`);
    }
  }

  public async get(email: string): Promise<ISubscription | null> {
    try {
      const lastSubscription =
        (await firebaseService.getDocs<ISubscriptionDB>(ECollections.Subscription, [{ param: 'email', value: email }]))
          .map(v => converter.fromFirestore(v.data))
          .sort((a, b) => +a.endDate - +b.endDate)
          .at(-1);

      if (!lastSubscription || lastSubscription.endDate < new Date()) {
        return null;
      }

      return lastSubscription;
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get subscription: ${error.message}`);
    }
  }

  public async add(email: string, accessValue: Exclude<TAccess, 'FREE'>) {
    try {
      const subscription = await this.get(email);
      const startDate = !subscription || accessOrder[subscription.access] < accessOrder[accessValue] ? new Date() : subscription.endDate;
      const endDate = addDays(startDate, 30);
      const newSubscription: ISubscription = {
        email,
        access: accessValue,
        startDate,
        days: 30,
        endDate,
      };
      await firebaseService.setDoc<ISubscriptionDB>(ECollections.Subscription, `${email}-${v4()}`, converter.toFirestore(newSubscription));
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to add subscription: ${error.message}`);
    }
  }
}

const subscription = new Subscription();
export default subscription;
