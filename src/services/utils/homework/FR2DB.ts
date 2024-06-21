import { removeImageSrc } from '../shared';

import type { IHomeworkData, IHomeworkDataDB } from 'services/homework.service';

export function homeworkDataFR2DB(homeworkDB: IHomeworkData): IHomeworkDataDB {
  return {
    ...homeworkDB,
    images: homeworkDB.images.map(removeImageSrc),
    review: reviewFR2DB(homeworkDB),
  };
}

function reviewFR2DB(homeworkDB: IHomeworkData) {
  const { review } = homeworkDB;
  if (!review) {
    return review;
  }

  return review.map(block => block.type !== 'image' ? block : { ...block, imageData: removeImageSrc(block.imageData) });
}
