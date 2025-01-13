import { firebaseService } from 'services/firebase.service';
import type { TUserCourseProgress, TUserCourseProgressDB } from 'services/userCourseProgress.service';
import { userCourseProgressConverter } from './userCourseProgressConverter';
import { GlobalCourseId, GlobalLessonsIds } from 'services/userCourseProgress.service/data';

class UserCourseProgress {
  public async get(courseId: string, userEmail: string): Promise<TUserCourseProgress | undefined> {
    try {
      const userCourseProgress = await this._get(courseId, userEmail);
      const globalCourseLessonsProgress = await this._getGlobalCourseLessonsProgress(userEmail);

      if (!userCourseProgress) {
        return undefined;
      }

      return {
        ...userCourseProgress,
        lessons: {
          ...userCourseProgress.lessons,
          ...globalCourseLessonsProgress,
        },
      };
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get user course progress: ${error.message}`);
    }
  }

  public async getAll(userEmail: string) {
    try {
      const coursesIds = (await firebaseService.getDocs<{ id: string }>(firebaseService.Collections.UserCourseProgress, []))
        .map(p => p.id)
        .filter(id => id !== GlobalCourseId);
      console.log('UserCourseProgress.getAll', { coursesIds });
      const globalCourseLessonsProgress = await this._getGlobalCourseLessonsProgress(userEmail);
      console.log('UserCourseProgress.getAll', { globalCourseLessonsProgress });
      const userCourseProgresses = await Promise.all(coursesIds.map(courseId =>
        firebaseService
          .getDoc<TUserCourseProgressDB>(firebaseService.Collections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail })
          .then(res => (console.log('UserCourseProgress.getAll then', { res }), res))
          .then(progress => progress && userCourseProgressConverter.fromFirestore(progress))
          .then(progress => progress && ({
            progress: {
              ...progress,
              lessons: {
                ...progress.lessons,
                ...globalCourseLessonsProgress,
              },
            },
            courseId,
          }))
      ));
      return userCourseProgresses.filter(p => p !== undefined);
    } catch (error) {
      console.log('Failed to get all user course progresses');
      throw error;
    }
  }

  public async set(params: { courseId: string, userEmail: string, progress: TUserCourseProgress }) {
    const globalCourseProgress = Object.fromEntries(Object.entries(params.progress.lessons).filter(([lessonId]) => GlobalLessonsIds.includes(lessonId)));
    const courseProgress = Object.fromEntries(Object.entries(params.progress.lessons).filter(([lessonId]) => !GlobalLessonsIds.includes(lessonId)));

    await Promise.all([
      this._set({ ...params, progress: { ...params.progress, lessons: courseProgress } }),
      this._set({ ...params, progress: { course: { lastVisitedAt: new Date() /* doesn't matter */ }, lessons: globalCourseProgress }, courseId: GlobalCourseId }),
    ]);
  }

  private async _get(courseId: string, userEmail: string) {
    try {
      const userCourseProgressDB = await firebaseService.getDoc<TUserCourseProgressDB>(firebaseService.Collections.UserCourseProgress, courseId, null, { collection: 'users', id: userEmail });

      if (!userCourseProgressDB) {
        return undefined;
      }

      return userCourseProgressConverter.fromFirestore(userCourseProgressDB);
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to get user course progress: ${error.message}`);
    }
  }

  private async _set(params: { courseId: string, userEmail: string, progress: TUserCourseProgress }) {
    try {
      const { courseId, userEmail, progress } = params;
      const newUserProgressDB = userCourseProgressConverter.toFirestore(progress);
      await firebaseService.setDoc(firebaseService.Collections.UserCourseProgress, courseId, newUserProgressDB, null, { collection: 'users', id: userEmail });
    } catch (error) {
      console.log('Failed to save user course progress');
      throw error;
    }
  }

  private async _getGlobalCourseLessonsProgress(userEmail: string) {
    const progress = await this._get(GlobalCourseId, userEmail);
    return {
      ...progress && progress.lessons,
    };
  }
}

const userCourseProgress = new UserCourseProgress();
(window as any).userCourseProgress = userCourseProgress;
export default userCourseProgress;
