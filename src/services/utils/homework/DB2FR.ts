import { dataService } from 'services/data.service';
import type { IHomeworkData, IHomeworkDataDB } from 'services/homework.service';
import type { ArgumentTypes } from 'types';
import { articleDB2FR } from '../article';

export async function homeworkDataDB2FR(homeworkDB: IHomeworkDataDB): Promise<IHomeworkData> {
  const { courseId, lessonId, userId } = homeworkDB;
  const images = await Promise.all(homeworkDB.images.map(image => addImageSrc(image, { courseId, lessonId, userId, imageId: image.id })));

  return {
    ...homeworkDB,
    images,
    review: homeworkDB.review ? await articleDB2FR(homeworkDB.review, { courseId, folder: lessonId, variant: `homeworks/${userId}` }) : undefined,
  };
}

type TGetImageUrlArgs = ArgumentTypes<typeof dataService.homework.getImageURL>;
async function addImageSrc<T extends { id: string }>(imageDataDB: T, props: TGetImageUrlArgs[0]): Promise<T & { src: string }> {
  return {
    ...imageDataDB,
    src: await dataService.homework.getImageURL(props).catch(_err => { /* already handled */ }) ?? '',
  };
}

