import { dataService, firebaseService } from 'services';

import { ECollections, IHomeworkDataDB, type IHomeworkData, ECommonErrorTypes } from 'types';
import { homeworkConverter } from './homeworkConverter';

interface IHomeworksFilter {
  id?: string
  courseId: string
  lessonId: string
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

  public async set(id: string, data: IHomeworkData) {
    return await firebaseService.setDoc(ECollections.Homework, id, data);
  }

  public getFullId(courseId: string, lessonId: string, userId: string) {
    return `${courseId}_${lessonId}_hw-${userId}`;
  }
};

export default new Homework();
