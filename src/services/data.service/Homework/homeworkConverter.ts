
import { homeworkDataDB2FR, homeworkDataFR2DB } from 'services/utils/homework';

import type { IHomeworkData, IHomeworkDataDB } from 'types';

export const homeworkConverter = {
  toFirestore: (homeworkData: IHomeworkData): IHomeworkDataDB => {
    return homeworkDataFR2DB(homeworkData);
  },
  fromFirestore: async (dataDB: IHomeworkDataDB): Promise<IHomeworkData> => {
    return await homeworkDataDB2FR(dataDB);
  },
};
