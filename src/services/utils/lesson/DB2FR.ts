import { firebaseService } from 'services/firebase.service';
import { dateDB2FR } from '../shared';

import type {
  ILessonContent,
  ILessonContentDB,
  ILessonData,
  ILessonDataDB,
  ILessonGalleryBlock,
  ILessonGalleryBlockDB,
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
    contentDB.map(c => {
      switch(c.type) {
        case 'image':
          return lessonImageBlockDB2FR(c, courseId);
        case 'gallery':
          return lessonGalleryBlockDB2FR(c, courseId);
        default:
          return c;
      }
    }
  ));

  return contentFR;
}

export async function lessonImageBlockDB2FR(imageBlockDB: ILessonImageBlockDB, courseId: string) {
  const imageBlockFR: ILessonImageBlock = {
    ...imageBlockDB,
    imageData: await addSrc(imageBlockDB.imageData, courseId),
  };
  return imageBlockFR;
}

export async function lessonGalleryBlockDB2FR(imageBlockDB: ILessonGalleryBlockDB, courseId: string) {
  const galleryBlockFR: ILessonGalleryBlock =
  {
    ...imageBlockDB,
    images: await Promise.all(imageBlockDB.images.map(image => addSrc(image, courseId))),
  };
  return galleryBlockFR;
}

async function addSrc<T extends { id: string }>(image: T, courseId: string): Promise<T & { src: string }> {
  return {
    ...image,
    src: (await firebaseService.getImageURL({ courseId, imageId: image.id })) ?? ''
  };
}
