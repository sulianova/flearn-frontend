import { v4 } from 'uuid';

import { ECollections, firebaseService } from 'services/firebase.service';
import { addMinutes } from 'utils';

import { converter } from './converter';
import type { IDiscount, IDiscountDB } from './types';

class Discount {
  public async get(email: string): Promise<IDiscount | null> {
    try {
      const lastDiscount =
        (await firebaseService.getDocs<IDiscountDB>(ECollections.Discount, [{ param: 'email', value: email }]))
          .map(v => converter.fromFirestore(v.data))
          .sort((a, b) => +a.endDate - +b.endDate)
          .at(-1);

      if (!lastDiscount || lastDiscount.endDate < new Date()) {
        return null;
      }

      return lastDiscount;
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get discount: ${error.message}`);
    }
  }

  public async add(data: Pick<IDiscount, 'id' | 'type' | 'email' | 'product' | 'discountPRC' | 'minutes' | 'startDate'>) {
    try {
      const endDate = addMinutes(data.startDate, data.minutes);
      const discount: IDiscount = { ...data, endDate, realized: false };
      await firebaseService.setDoc<IDiscountDB>(ECollections.Discount, data.id, converter.toFirestore(discount));
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to add discount: ${error.message}`);
    }
  }

  public async set(data: IDiscount) {
    try {
      await firebaseService.setDoc<IDiscountDB>(ECollections.Discount, data.id, converter.toFirestore(data));
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to set discount: ${error.message}`);
    }
  }
}

const discount = new Discount();
export default discount;
