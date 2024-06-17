import type {
  ILessonData,
  ILessonDataDB,
  ILessonContent,
  ILessonContentDB,
  ILessonImageBlock,
  ILessonImageBlockDB
} from 'services/lesson.service/types';

import { removeImageSrc } from '../shared';

export function lessonDataFR2DB(lesson: ILessonData): ILessonDataDB {
  return {
    ...lesson,
    content: lessonContentFR2DB(lesson.content),
  };
}

export function lessonContentFR2DB(contentDB: ILessonContent) {
  const contentFR: ILessonContentDB = contentDB
    .map(c => c.type === 'image' ? lessonImageBlockFR2DB(c) : c);

  return contentFR;
}

function lessonImageBlockFR2DB(imageBlockDB: ILessonImageBlock) {
  const imageBlockFR: ILessonImageBlockDB = {
    ...imageBlockDB,
    imageData: removeImageSrc(imageBlockDB.imageData),
  };
  return imageBlockFR;
}
