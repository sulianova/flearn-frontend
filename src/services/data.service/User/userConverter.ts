import { dateDB2FR, dateFR2DB } from 'services/utils/shared';

import type { IUserData, IUserDataDB } from '../../user.service';

export const userConverter = {
  toFirestore: (userData: IUserData): IUserDataDB => ({
    ...userData,
    firstSignInAt: dateFR2DB(userData.firstSignInAt),
    lastSignInAt: dateFR2DB(userData.lastSignInAt),
  }),
  fromFirestore: (userDataDB: IUserDataDB): IUserData => ({
    ...userDataDB,
    firstSignInAt: dateDB2FR(userDataDB.firstSignInAt),
    lastSignInAt: dateDB2FR(userDataDB.lastSignInAt),
  }),
};
