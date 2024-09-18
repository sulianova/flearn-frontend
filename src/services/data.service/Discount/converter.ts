import { dateDB2FR, dateFR2DB } from 'services/utils/shared';

import type { IDiscount, IDiscountDB } from './types';

export const converter = {
  toFirestore: (data: IDiscount): IDiscountDB => {
    return {
      ...data,
      startDate: dateFR2DB(data.startDate),
      endDate: dateFR2DB(data.endDate),
    };
  },
  fromFirestore: (data: IDiscountDB): IDiscount => {
    return {
      ...data,
      startDate: dateDB2FR(data.startDate),
      endDate: dateDB2FR(data.endDate),
    };
  },
};
