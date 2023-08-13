
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import type { ILessonData, ILessonDataDB } from 'types';

export const lessonConverter: FirestoreDataConverter<DocumentData, DocumentData> = {
  toFirestore: (lessonData: ILessonData) => {
    return lessonData;
  },
  fromFirestore: (snapshot, options) => {
    const dataDB = snapshot.data(options) as ILessonDataDB;
    const dataFR: ILessonData = {
      ...dataDB,
      startDate: new Date(dataDB.startDate.seconds * 1_000 + dataDB.startDate.nanoseconds/1_000_000),
      endDate: new Date(dataDB.endDate.seconds * 1_000 + dataDB.endDate.nanoseconds/1_000_000),
    };

    return dataFR;
  },
};
