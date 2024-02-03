import { authService, firebaseService } from 'services';

import { lessonConverter } from './lessonConverter';

import { ECollections, ECommonErrorTypes } from 'types';
import type { IAccessData, ILessonData, ILessonDataDB } from 'types';

interface ILessonsFilter {
    courseId: string
}

class Lesson {
  public async get(courseId: string, lessonId: string) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    const userHasAccess = await this._checkCourseAccess(courseId);

    if (!userHasAccess) {
      throw new Error(ECommonErrorTypes.Restricted);
    }
    const lessonDataDB = (await firebaseService.getDoc(ECollections.Lesson, fullLessonId)) as ILessonDataDB | undefined;
    if (!lessonDataDB) {
      throw new Error(ECommonErrorTypes.FailedToFindData);
    }

    const lessonData = await lessonConverter.fromFirestore(lessonDataDB);

    return lessonData;
  }

  public async getAll(filter: ILessonsFilter) {
    // TODO add filter for other than course
    const userHasAccess = await this._checkCourseAccess(filter.courseId);

    if (!userHasAccess) {
      throw new Error(ECommonErrorTypes.Restricted);
    }

    const lessonsDataDB = (await firebaseService.getDocs(ECollections.Lesson, [{ param: 'courseId', value: filter.courseId }]))
      .map(d => d.data) as ILessonDataDB[];
    // TODO add check for restricted access for each lesson
    const lessonsData = await Promise.all(lessonsDataDB.map(lessonDataDB => lessonConverter.fromFirestore(lessonDataDB)));

    return lessonsData;
  }

  public async set(courseId: string, lessonId: string, lessonData: ILessonData): Promise<ILessonData> {
    const fullLessonId = this.getFullId(courseId, lessonId);
    const lessonDataDB = lessonConverter.toFirestore(lessonData);
    const newLessonDataDB = (await firebaseService.setDoc(ECollections.Lesson, fullLessonId, lessonDataDB)) as ILessonDataDB | undefined;

    if (!newLessonDataDB) {
      throw new Error('Failed to update lesson');
    }

    return await lessonConverter.fromFirestore(newLessonDataDB);
  }

  public getFullId(courseId: string, lessonId: string) {
    return `${courseId}_${lessonId}`;
  }

  public async _checkCourseAccess(courseId: string) {
    const user = authService.user;
    if (!user) {
      throw new Error(ECommonErrorTypes.Unauthorized);
    }

    const accessData = await firebaseService.getDoc(ECollections.Access, courseId) as IAccessData | undefined;
    if (!accessData) {
      throw new Error('Server error: failed to find access table');
    }

    if (!user.email) {
      throw new Error('Server error: failed to find user email');
    }

    const userHasAccess = Boolean(accessData.users[user.email]);
    return userHasAccess;
  }
}

export default new Lesson();