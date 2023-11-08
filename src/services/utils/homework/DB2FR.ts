import { dataService } from 'services/data.service';
import type { ArgumentTypes, IHomeworkData, IHomeworkDataDB, IHomeworkImageData, IHomeworkImageDataDB } from 'types';

export async function homeworkDataDB2FR(homeworkDB: IHomeworkDataDB): Promise<IHomeworkData> {
  const { courseId, lessonId, userId } = homeworkDB;
  const images = await Promise.all(homeworkDB.images.map(image => addImageSrc(image, { courseId, lessonId, userId, imageId: image.id })));

  return { ...homeworkDB, images };
}

type TGetImageUrlArgs = ArgumentTypes<typeof dataService.homework.getImageURL>;
async function addImageSrc(imageDataDB: IHomeworkImageDataDB, props: TGetImageUrlArgs[0]): Promise<IHomeworkImageData> {
  return {
    ...imageDataDB,
    src: await dataService.homework.getImageURL(props).catch(_err => { /* already handled */ }) ?? '',
  };
}
