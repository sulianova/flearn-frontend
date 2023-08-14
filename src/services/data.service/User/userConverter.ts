
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import type { IUserData, IUserDataDB } from 'types';

export const userConverter: FirestoreDataConverter<DocumentData, DocumentData> = {
  toFirestore: (lessonData: IUserData) => {
    return lessonData;
  },
  fromFirestore: (snapshot, options) => {
    const dataDB = snapshot.data(options) as IUserDataDB;
    const dataFR: IUserData = {
      ...dataDB,
      firstSignInAt: new Date(dataDB.firstSignInAt.seconds * 1_000 + dataDB.firstSignInAt.nanoseconds/1_000_000),
      lastSignInAt: new Date(dataDB.lastSignInAt.seconds * 1_000 + dataDB.lastSignInAt.nanoseconds/1_000_000),
    };

    return dataFR;
  },
};
