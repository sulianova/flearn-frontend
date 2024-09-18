import { dateDB2FR, dateFR2DB } from 'services/utils/shared';

import type { ISubscription, ISubscriptionDB } from './types';

export const converter = {
  toFirestore: (data: ISubscription): ISubscriptionDB => {
    return {
      ...data,
      startDate: dateFR2DB(data.startDate),
      endDate: dateFR2DB(data.endDate),
    };
  },
  fromFirestore: (data: ISubscriptionDB): ISubscription => {
    return {
      ...data,
      startDate: dateDB2FR(data.startDate),
      endDate: dateDB2FR(data.endDate),
    };
  },
};
