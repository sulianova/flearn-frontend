import { dataService } from 'services/data.service';
import type { IHomeworkData, IHomeworkDataDB } from 'services/homework.service';
import type { ArgumentTypes } from 'types';

export async function homeworkDataDB2FR(homeworkDB: IHomeworkDataDB): Promise<IHomeworkData> {
  const { courseId, lessonId, userId } = homeworkDB;
  const images = await Promise.all(homeworkDB.images.map(image => addImageSrc(image, { courseId, lessonId, userId, imageId: image.id })));

  return {
    ...homeworkDB,
    images,
    review: await reviewDB2FR(homeworkDB),
  };
}

type TGetImageUrlArgs = ArgumentTypes<typeof dataService.homework.getImageURL>;
async function addImageSrc<T extends { id: string }>(imageDataDB: T, props: TGetImageUrlArgs[0]): Promise<T & { src: string }> {
  return {
    ...imageDataDB,
    src: await dataService.homework.getImageURL(props).catch(_err => { /* already handled */ }) ?? '',
  };
}

export async function reviewDB2FR(homeworkDB: IHomeworkDataDB) {
  const { courseId, lessonId, userId, review } = homeworkDB;
  if (!review) {
    return review;
  }

  return Promise.all(review.map(async block =>
    block.type !== 'image' ? block : {
      ...block,
      imageData: await addImageSrc(block.imageData, { courseId, lessonId, userId, imageId: block.imageData.id }),
    }
  ));
}
