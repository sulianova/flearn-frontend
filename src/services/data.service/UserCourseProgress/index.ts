import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { TUserCourseProgress } from './types';

export type { TUserCourseProgress } from './types';

class UserCourseProgress {
  public async get(courseId: string, userEmail: string) {
    try {
      return await firebaseService.getDocOrThrow<TUserCourseProgress>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail });
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get user course progress: ${error.message}`);
    }
  }

  public async markLessonAsRead(courseId: string, userEmail: string, lessonId: string) {
    try {
      const userProgress = await firebaseService.getDocOrThrow<TUserCourseProgress>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail });
      const newUserProgress = {
        ...userProgress,
        [lessonId]: true,
      };
      await firebaseService.setDoc(ECollections.UserCourseProgress, courseId, newUserProgress, null, { collection: 'users', id: userEmail });
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to set user course progress: ${error.message}`);
    }
  }

  public async init(courseId: string, userEmail: string) {
    try {
      const userProgress = (await firebaseService.getDoc<TUserCourseProgress>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail })) ?? {};
      await firebaseService.setDoc(ECollections.UserCourseProgress, courseId, userProgress, null, { collection: 'users', id: userEmail });
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to init user course progress: ${error.message}`);
    }
  }
}

const userCourseProgress = new UserCourseProgress();
(window as any).userCourseProgress = userCourseProgress;
export default userCourseProgress;
