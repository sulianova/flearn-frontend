import { authService, firebaseService } from 'services';

import { lessonConverter } from './lessonConverter';

import { ECollections, ELessonErrorTypes } from 'types';
import type { IAccessData, ILessonData, ILessonDataDB } from 'types';

class Lesson {
  public async get(courseId: string, lessonId: string) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    const userHasAccess = await this._checkCourseAccess(courseId);

    if (!userHasAccess) {
      throw new Error(ELessonErrorTypes.Restricted);
    }
    const lessonDataDB = (await firebaseService.getDoc(ECollections.Lesson, fullLessonId)) as ILessonDataDB | undefined;
    if (!lessonDataDB) {
      throw new Error(ELessonErrorTypes.FailedToFindLesson);
    }

    const lessonData = await lessonConverter.fromFirestore(lessonDataDB, courseId);

    return lessonData;
  }

  public async set(courseId: string, lessonId: string, data: ILessonData) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    return await firebaseService.setDoc(ECollections.Lesson, fullLessonId, data);
  }

  public getFullId(courseId: string, lessonId: string) {
    return `${courseId}_${lessonId}`;
  }

  public async _checkCourseAccess(courseId: string) {
    const user = authService.user;
    if (!user) {
      throw new Error(ELessonErrorTypes.Unauthorized);
    }

    const accessData = await firebaseService.getDoc(ECollections.Access, courseId) as IAccessData | undefined;
    if (!accessData) {
      throw new Error(ELessonErrorTypes.FailedToFindLesson);
    }

    const userHasAccess = Boolean(accessData.users[user.uid]);
    return userHasAccess;
  }
}

export default new Lesson();