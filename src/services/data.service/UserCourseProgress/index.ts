import { firebaseService } from 'services/firebase.service';
import type { TUserCourseProgress, TUserCourseProgressDB } from 'services/userCourseProgress.service';
import { userCourseProgressConverter } from './userCourseProgressConverter';

class UserCourseProgress {
  public async get(courseId: string, userEmail: string) {
    try {
      const userCourseProgressDB = await firebaseService.getDoc<TUserCourseProgressDB>(firebaseService.Collections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail });
      if (!userCourseProgressDB) {
        return {};
      }
      return userCourseProgressConverter.fromFirestore(userCourseProgressDB);
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get user course progress: ${error.message}`);
    }
  }

  public async getAll(userEmail: string) {
    try {
      const coursesIds = (await firebaseService.getDocs<{ id: string }>(firebaseService.Collections.UserCourseProgress, [])).map(p => p.id);
      const userCourseProgresses = await Promise.all(coursesIds.map(courseId =>
        firebaseService
          .getDoc<TUserCourseProgressDB>(firebaseService.Collections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail })
          .then(progress => !progress ? undefined : userCourseProgressConverter.fromFirestore(progress))
          .then(progress => !progress ? undefined : ({ progress, courseId }))
      ));
      return userCourseProgresses.filter(p => p !== undefined);
    } catch (error) {
      console.log('Failed to get all user course progresses');
      throw error;
    }
  }

  public async set(params: { courseId: string, userEmail: string, progress: TUserCourseProgress }) {
    try {
      const { courseId, userEmail, progress } = params;
      const newUserProgressDB = userCourseProgressConverter.toFirestore(progress);
      await firebaseService.setDoc(firebaseService.Collections.UserCourseProgress, courseId, newUserProgressDB, null, { collection: 'users', id: userEmail });
    } catch (error) {
      console.log('Failed to save user course progress');
      throw error;
    }
  }
}

const userCourseProgress = new UserCourseProgress();
(window as any).userCourseProgress = userCourseProgress;
export default userCourseProgress;
