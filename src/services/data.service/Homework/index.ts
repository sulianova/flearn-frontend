import { dataService, firebaseService } from 'services';

import { ECollections, IHomeworkDataDB, type IHomeworkData, ECommonErrorTypes } from 'types';
import { homeworkConverter } from './homeworkConverter';

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

  public async set(courseId: string, lessonId: string, userId: string, data: IHomeworkData) {
    const id = this.getFullId(courseId, lessonId, userId);
    return await firebaseService.setDoc(ECollections.Homework, id, data);
  }

  public getFullId(courseId: string, lessonId: string, userId: string) {
    return `${courseId}_${lessonId}_hw-${userId}`;
  }
};

export default new Homework();
