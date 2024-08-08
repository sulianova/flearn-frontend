
import { orderDataDB2FR, orderDataFR2DB } from 'services/utils/order';

import type { IOrderData, IOrderDataDB } from 'types';

export const orderConverter = {
  toFirestore: (orderData: IOrderData): IOrderDataDB => {
    return orderDataFR2DB(orderData);
  },
  fromFirestore: (orderDataDB: IOrderDataDB): IOrderData => {
    return orderDataDB2FR(orderDataDB);
  },
};
