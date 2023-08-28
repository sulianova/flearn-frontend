import { authService, firebaseService } from 'services';

import { lessonConverter } from './lessonConverter';

import { ECollections, ELessonErrorTypes } from 'types';
import type { IAccessData, ILessonData } from 'types';

class Lesson {
  public async get(courseId: string, lessonId: string) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    const userHasAccess = await this._checkCourseAccess(courseId);

    if (!userHasAccess) {
      throw new Error(ELessonErrorTypes.Restricted);
    }
    const lessonData = await firebaseService.getDoc(ECollections.Lesson, fullLessonId, lessonConverter);
    if (!lessonData) {
      throw new Error(ELessonErrorTypes.FailedToFindLesson);
    }

    return lessonData;
  }

  public async set(courseId: string, lessonId: string, data: ILessonData) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    return await firebaseService.setDoc(ECollections.Lesson, fullLessonId, data, lessonConverter);
  }

  public getFullId(courseId: string, lessonId: string) {
    return `${courseId}_${lessonId}`;
  }

  private async _checkCourseAccess(courseId: string) {
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

export default Lesson;