import { addImageSrc } from '../shared';
import type { IHomeworkData, IHomeworkDataDB } from 'types';

export async function homeworkDataDB2FR(homeworkDB: IHomeworkDataDB): Promise<IHomeworkData> {
    const { courseId, lessonId } = homeworkDB;
    const images = !homeworkDB.images ? undefined
        : await Promise.all(homeworkDB.images.map(image => addImageSrc(image, { courseId, folder: lessonId, imageId: image.id })));

    return { ...homeworkDB, images };
}
