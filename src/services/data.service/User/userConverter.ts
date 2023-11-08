
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import type { IUserData, IUserDataDB } from '../../user.service';

export const userConverter = {
  toFirestore: (userData: IUserData): IUserDataDB => {
    return {
      ...userData,
    };
  },
  fromFirestore: (userDataDB: IUserDataDB): IUserData => {
    const dataFR: IUserData = {
      ...userDataDB,
      firstSignInAt: new Date(userDataDB.firstSignInAt.seconds * 1_000 + userDataDB.firstSignInAt.nanoseconds/1_000_000),
      lastSignInAt: new Date(userDataDB.lastSignInAt.seconds * 1_000 + userDataDB.lastSignInAt.nanoseconds/1_000_000),
    };

    return dataFR;
  },
};
