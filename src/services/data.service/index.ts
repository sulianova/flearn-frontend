import { authService, firebaseService } from 'services';

import { courseConverter } from './courseConverter';
import { lessonConverter } from './lessonConverter';

import { ECollections } from 'types';
import type { ICourseData, ILessonData } from 'types';

class DataService {
  public async getCourse(id: string) {
    // await this._checkCourseAccess(id);
    return await firebaseService.getDoc(ECollections.Course, id, courseConverter);
  }

  public async setCourse(id: string, data: ICourseData) {
    return await firebaseService.setDoc(ECollections.Course, id, data, courseConverter);
  }

  public async getLesson(id: string) {
    // await this._checkCourseAccess(id);
    return await firebaseService.getDoc(ECollections.Lesson, id, lessonConverter);
  }

  public async setLesson(id: string, data: ILessonData) {
    return await firebaseService.setDoc(ECollections.Lesson, id, data, lessonConverter);
  }

  private async _checkCourseAccess(courseId: string) {
    let user = authService.user;
    if (!user) {
      await authService.authenticate();
      user = authService.user!;
    }

    // const access = await firebaseService.getDoc(ECollections.Access, courseId) as Record<string, Record<string, boolean> | undefined> | undefined;
    // const userHasAccess = access && access[courseId] && access[courseId]?.[uuid];
    // return userHasAccess;
    return true;
  }
}

export const dataService = new DataService();
