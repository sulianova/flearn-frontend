
import { firebaseService } from 'services/firebase.service';

import type { ILessonContent, ILessonContentDB, ILessonData, ILessonDataDB, ILessonImageBlock, ILessonImageBlockDB } from 'types';

export const lessonConverter = {
  toFirestore: (lessonData: ILessonData) => {
    return lessonData;
  },
  fromFirestore: async (dataDB: ILessonDataDB, courseId: string) => {

    const dataFR: ILessonData = {
      ...dataDB,
      startDate: new Date(dataDB.startDate.seconds * 1_000 + dataDB.startDate.nanoseconds/1_000_000),
      endDate: new Date(dataDB.endDate.seconds * 1_000 + dataDB.endDate.nanoseconds/1_000_000),
      content: await contencDB2FR(dataDB.content, courseId),
    };

    return dataFR;
  },
};

async function contencDB2FR(contentDB: ILessonContentDB, courseId: string) {
  const contentFR: ILessonContent = await Promise.all(
    contentDB.map(c => c.type === 'image' ? imageBlockDB2FR(c, courseId) : c)
  );

  return contentFR;
}

async function imageBlockDB2FR(imageBlockDB: ILessonImageBlockDB, courseId: string) {
  const imageBlockFR: ILessonImageBlock = {
    ...imageBlockDB,
    imageData: {
      ...imageBlockDB.imageData,
      src: (await firebaseService.getImageURL({ courseId, imageId: imageBlockDB.imageData.id })) ?? '',
    },
  };
  return imageBlockFR;
}
