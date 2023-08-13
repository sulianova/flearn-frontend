import { authService, firebaseService } from 'services';

import { lessonConverter } from './lessonConverter';

import { ECollections } from 'types';
import type { IAccessData, ILessonData } from 'types';

class Lesson {
  public async get(courseId: string, lessonId: string) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    const userHasAccess = await this._checkCourseAccess(courseId);
    if (userHasAccess) {
      return await firebaseService.getDoc(ECollections.Lesson, fullLessonId, lessonConverter);
    } else {
      return undefined;
    }
  }

  public async set(courseId: string, lessonId: string, data: ILessonData) {
    const fullLessonId = this.getFullId(courseId, lessonId);
    return await firebaseService.setDoc(ECollections.Lesson, fullLessonId, data, lessonConverter);
  }

  public getFullId(courseId: string, lessonId: string) {
    return `${courseId}_${lessonId}`;
  }

  private async _checkCourseAccess(courseId: string) {
    const user = await authService.getAuthenticatedUser();
    const accessData = await firebaseService.getDoc(ECollections.Access, courseId) as IAccessData | undefined;
    const userHasAccess = Boolean(accessData && user.email && accessData.users[user.email]);
    return userHasAccess;
  }
}

export default Lesson;