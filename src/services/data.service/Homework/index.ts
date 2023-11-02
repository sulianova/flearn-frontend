import { v4 } from 'uuid';

import { dataService, firebaseService } from 'services';

import { ECollections, IHomeworkDataDB, type IHomeworkData, ECommonErrorTypes } from 'types';
import { homeworkConverter } from './homeworkConverter';

interface IHomeworksFilter {
  courseId: string
  lessonId?: string
  userId?: string
  id?: string
}
class Homework {
  public async get(courseId: string, lessonId: string, userId: string) {
    const hasAccess = await dataService.lesson._checkCourseAccess(courseId);

    if (!hasAccess) {
      throw new Error('Homework: access restricted');
    }

    const id = this.getFullId(courseId, lessonId, userId);
    const homeworkDataDB = await firebaseService.getDoc(ECollections.Homework, id) as IHomeworkDataDB | undefined;

    if (!homeworkDataDB) {
      throw new Error(ECommonErrorTypes.FailedToFindData);
    }

    return await homeworkConverter.fromFirestore(homeworkDataDB);
  }

  public async getAll(filter: IHomeworksFilter) {
    // TODO add filter for other than course and lesson
    const userHasAccess = await dataService.lesson._checkCourseAccess(filter.courseId);

    if (!userHasAccess) {
      throw new Error(ECommonErrorTypes.Restricted);
    }

    const queryConstraints = Object.entries(filter).map(([param, value]) => ({ param, value }));
    const homeworksDataDB = (await firebaseService.getDocs(ECollections.Homework, queryConstraints)) as IHomeworkDataDB[];
    const homeworksData = await Promise.all(homeworksDataDB.map(homeworkDataDB => homeworkConverter.fromFirestore(homeworkDataDB)));

    return homeworksData;
  }

  public async create(id: string, homeworkData: IHomeworkData) {
    const homeworkAlreadyExists = await firebaseService.docExists(ECollections.Homework, id);
    if (homeworkAlreadyExists) {
      throw new Error('Cannot create duplicated homework');
    }

    await this.set(id, homeworkData);
  }

  public async set(id: string, homeworkData: IHomeworkData) {
    const homeworkDataDB = homeworkConverter.toFirestore(homeworkData);
    return await firebaseService.setDoc(ECollections.Homework, id, homeworkDataDB);
  }

  public async patch(id: string, patch: Partial<IHomeworkData>) {
    const homeworkData = await firebaseService.getDocOrThrow(ECollections.Homework, id) as IHomeworkData;
    const homeworkDataDB = homeworkConverter.toFirestore({ ...homeworkData, ...patch });
    return await firebaseService.setDoc(ECollections.Homework, id, homeworkDataDB);
  }

  public async uploadImage(props: { courseId: string, lessonId: string, userId: string, imageId: string, file: File }) {
    try {
      const path = this._getImagePath(props);
      await firebaseService._uploadImage({ path, file: props.file });
    } catch (err) {
      // tslint:disable-next-line
      console.error(err);
      throw new Error('Failed to upload homework image');
    }
  }

  public async deleteImage(props: { courseId: string, lessonId: string, userId: string, imageId: string, file: File }) {
    try {
      const path = this._getImagePath(props);
      await firebaseService._deleteImage({ path });
    } catch (err) {
      // tslint:disable-next-line
      console.error(err);
      throw new Error('Failed to delete homework image');
    }
  }

  public async getImageURL(props: { courseId: string, lessonId: string, userId: string, imageId: string }) {
    try {
      const path = this._getImagePath(props);
      return await firebaseService._getImageURL({ path });
    } catch (err) {
      // tslint:disable-next-line
      console.error(err);
      throw new Error('Failed to get homework image URL');
    }
  }

  public getFullId(courseId: string, lessonId: string, userId: string) {
    return `${courseId}_${lessonId}_hw-${userId}`;
  }

  public generateImageId(props: { originalName: string }) {
    const type = props.originalName.split('.').at(-1) ?? '';
    const randomPart = '_' + v4().slice(0, 5);

    if (!['png', 'jpg', 'jpeg'].includes(type.toLocaleLowerCase())) {
      return props.originalName + randomPart;
    }

    const fileName = props.originalName.replace(`.${type}`, '');
    const id = fileName + randomPart + `.${type}`;
    return id;
  }

  private _getImagePath(props: { courseId: string, lessonId: string, userId: string, imageId: string }) {
    return `${props.courseId}/${props.lessonId}/homeworks/${props.userId}/${props.imageId}`;
  }
};

export default new Homework();
