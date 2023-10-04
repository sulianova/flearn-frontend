import { firebaseService } from 'services/firebase.service';
import { dateDB2FR } from '../shared';

import type {
  ILessonContent,
  ILessonContentDB,
  ILessonData,
  ILessonDataDB,
  ILessonImageBlock,
  ILessonImageBlockDB
} from 'types';

export async function lessonDataDB2FR(lessonDB: ILessonDataDB): Promise<ILessonData> {
  return {
    ...lessonDB,
    content: await lessonContencDB2FR(lessonDB.content, lessonDB.courseId),
    startDate: dateDB2FR(lessonDB.startDate),
    endDate: dateDB2FR(lessonDB.endDate),
    resultsEndDate: dateDB2FR(lessonDB.resultsEndDate),
  };
}

export async function lessonContencDB2FR(contentDB: ILessonContentDB, courseId: string) {
  const contentFR: ILessonContent = await Promise.all(
    contentDB.map(c => c.type === 'image' ? lessonImageBlockDB2FR(c, courseId) : c)
  );

  return contentFR;
}

export async function lessonImageBlockDB2FR(imageBlockDB: ILessonImageBlockDB, courseId: string) {
  const imageBlockFR: ILessonImageBlock = {
    ...imageBlockDB,
    imageData: {
      ...imageBlockDB.imageData,
      src: (await firebaseService.getImageURL({ courseId, imageId: imageBlockDB.imageData.id })) ?? '',
    },
  };
  return imageBlockFR;
}
