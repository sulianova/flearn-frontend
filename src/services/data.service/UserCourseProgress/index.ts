import { firebaseService } from 'services/firebase.service';
import type { TUserCourseProgress, TUserCourseProgressDB } from 'services/userCourseProgress.service';
import { ECollections } from 'types';
import { userCourseProgressConverter } from './userCourseProgressConverter';
import { isDefined } from 'utils';

class UserCourseProgress {
  public async get(courseId: string, userEmail: string) {
    try {
      const userCourseProgressDB = await firebaseService.getDocOrThrow<TUserCourseProgressDB>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail });
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
      const coursesIds = (await firebaseService.getDocs<{ id: string }>(ECollections.UserCourseProgress, [])).map(p => p.id);
      const userCourseProgresses = await Promise.all(coursesIds.map(courseId =>
        firebaseService
          .getDoc<TUserCourseProgressDB>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail })
          .then(progress => !progress ? undefined : userCourseProgressConverter.fromFirestore(progress))
          .then(progress => !progress ? undefined : ({ progress, courseId }))
      ));
      return userCourseProgresses.filter(isDefined);
    } catch (error) {
      console.log('Failed to get all user course progresses');
      throw error;
    }
  }

  public async markLessonAsRead(courseId: string, userEmail: string, lessonId: string) {
    try {
      const userProgressDB = await firebaseService.getDocOrThrow<TUserCourseProgressDB>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail });
      const userProgress = userCourseProgressConverter.fromFirestore(userProgressDB);
      const newUserProgress: TUserCourseProgress = {
        ...userProgress,
        [lessonId]: {
          solved: true,
          lastSolvedAt: new Date(),
        },
      };
      const newUserProgressDB = userCourseProgressConverter.toFirestore(newUserProgress);
      await firebaseService.setDoc(ECollections.UserCourseProgress, courseId, newUserProgressDB, null, { collection: 'users', id: userEmail });
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to set user course progress: ${error.message}`);
    }
  }

  public async init(courseId: string, userEmail: string) {
    try {
      const userProgressDB = (await firebaseService.getDoc<TUserCourseProgressDB>(ECollections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail })) ?? {};
      await firebaseService.setDoc(ECollections.UserCourseProgress, courseId, userProgressDB, null, { collection: 'users', id: userEmail });
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
