import { addImageSrc, dateDB2FR } from '../shared';

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
    content: await lessonContencDB2FR(lessonDB.content, lessonDB.courseId, lessonDB.id),
    startDate: dateDB2FR(lessonDB.startDate),
    endDate: dateDB2FR(lessonDB.endDate),
    resultsEndDate: dateDB2FR(lessonDB.resultsEndDate),
  };
}

export async function lessonContencDB2FR(contentDB: ILessonContentDB, courseId: string, lessonId: string) {
  const contentFR: ILessonContent = await Promise.all(
    contentDB.map(c => {
      switch(c.type) {
        case 'image':
          return lessonImageBlockDB2FR(c, courseId, lessonId);
        case 'gallery':
          return lessonGalleryBlockDB2FR(c, courseId, lessonId);
        default:
          return c;
      }
    }
  ));

  return contentFR;
}

export async function lessonImageBlockDB2FR(imageBlockDB: ILessonImageBlockDB, courseId: string, lessonId: string) {
  const imageBlockFR: ILessonImageBlock = {
    ...imageBlockDB,
    imageData: await addImageSrc(imageBlockDB.imageData, { courseId, folder: lessonId, imageId: imageBlockDB.imageData.id }),
  };
  return imageBlockFR;
}

export async function lessonGalleryBlockDB2FR(imageBlockDB: ILessonGalleryBlockDB, courseId: string, lessonId: string) {
  const galleryBlockFR: ILessonGalleryBlock =
  {
    ...imageBlockDB,
    images: await Promise.all(imageBlockDB.images.map(image => addImageSrc(image, { courseId, folder: lessonId, imageId: image.id }))),
  };
  return galleryBlockFR;
}
