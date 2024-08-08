import { articleFR2DB } from '../article';
import { removeImageSrc } from '../shared';

import type { IHomeworkData, IHomeworkDataDB } from 'services/homework.service';

export function homeworkDataFR2DB(homeworkDB: IHomeworkData): IHomeworkDataDB {
  return {
    ...homeworkDB,
    images: homeworkDB.images.map(removeImageSrc),
    review: homeworkDB.review ? articleFR2DB(homeworkDB.review) : undefined,
  };
}
