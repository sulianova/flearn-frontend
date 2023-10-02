
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import type { ICourseData, ICourseDataDB } from 'types';

export const courseConverter: FirestoreDataConverter<DocumentData, DocumentData> = {
  toFirestore: (courseData: ICourseData) => {
    return courseData;
  },
  fromFirestore: (snapshot, options) => {
    const dataDB = snapshot.data(options) as ICourseDataDB;
    const dataFR: ICourseData = {
      ...dataDB,
      startDate: new Date(dataDB.startDate.seconds * 1_000 + dataDB.startDate.nanoseconds/1_000_000),
      endDate: new Date(dataDB.endDate.seconds * 1_000 + dataDB.endDate.nanoseconds/1_000_000),
      discontDeadline: new Date(dataDB.discontDeadline.seconds * 1_000 + dataDB.discontDeadline.nanoseconds/1_000_000),
    };

    return dataFR;
  },
};
