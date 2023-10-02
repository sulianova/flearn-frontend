import { dateFR2DB } from '../shared';

import type {
  ILessonContent,
  ILessonContentDB,
  ILessonData,
  ILessonDataDB,
  ILessonImageBlock,
  ILessonImageBlockDB
} from 'types';

export function lessonDataFR2DB(lesson: ILessonData): ILessonDataDB {
  return {
    ...lesson,
    content: lessonContentFR2DB(lesson.content),
    startDate: dateFR2DB(lesson.startDate),
    endDate: dateFR2DB(lesson.endDate),
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
    imageData: {
      id: imageBlockDB.imageData.id,
      alt: imageBlockDB.imageData.alt,
      ...imageBlockDB.imageData.caption && { caption: imageBlockDB.imageData.caption },
    },
  };
  return imageBlockFR;
}
