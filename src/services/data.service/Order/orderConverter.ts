
import { orderDataFR2DB } from 'services/utils/order';

import type { IOrderData, IOrderDataDB } from 'types';

export const orderConverter = {
  toFirestore: (orderData: IOrderData): IOrderDataDB => {
    return orderDataFR2DB(orderData);
  },
  // fromFirestore: (dataDB: IOrderDataDB): IOrderData => {
  //   return;
  // },
};
