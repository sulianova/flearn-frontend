import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionBS, TActionS } from './types';
import { authService } from 'services';
import { safeObjectKeys } from 'utils';
import { ILessonData, lessonService } from 'services/lesson.service';
import useLastStudiedCourse from './useLastStudiedCourse';
import { courseService, ICourseData } from 'services/course.service';

export type { TProgress, TProgressDB, TUserCourseProgress, TUserCourseProgressDB } from './types';

class UserCourseProgressService {
  public userCourseProgresS = new Subject<TActionS>();
  public useLastStudiedCourse = useLastStudiedCourse;

  constructor() {
    this.init();
  }

  public init() {
    merge(
      this.userCourseProgresS,
      authService.firebaseUserBS,
    )
    .subscribe(() => {
      const user = authService.user;
      if (!user) {
        this._lastStudiedCourseBS.next(null);
        return;
      }

      this.fetchLastStudiedCourse()
        .then(course => {
          this._lastStudiedCourseBS.next(course);
        })
        .catch(error => {
          console.log('Failed to fetch LastStudiedCourse for _lastStudiedCourseBS', { error, user });
          this._lastStudiedCourseBS.next(null);
        })
    });
  }

  public async markLessonAsRead(courseId: string, userEmail: string, lessonId: string) {
    try {
      await dataService.userCourseProgress.markLessonAsRead(courseId, userEmail, lessonId);
      this.userCourseProgresS.next({ type: 'updated', payload: { courseId, lessonId }});
    } catch (error) {
      console.log('Failed to mark lesson as read', { error });
      throw error;
    }
  }

  public async isLessonSolved(courseId: string, userEmail: string, lessonId: string) {
    try {
      return (await dataService.userCourseProgress.get(courseId, userEmail))[lessonId]?.solved ?? false;
    } catch (error) {
      console.log('Failed to check id lesson is solved');
      throw error;
    }
  }

  private async fetchLastStudiedCourse() {
    try {
      const authedUser = authService.user;
      if (!authedUser) {
        throw new Error('Not authenticated');
      }
      const accessedCoursesIds = (await dataService.access.getAll({ email: authedUser.email })).map(({ id }) => id);
      const randomAccessedCourseId = accessedCoursesIds.at(0);
      const userCourseProgreses = await dataService.userCourseProgress.getAll(authedUser.email);
      const lastSolvedLessonProgress = userCourseProgreses
        .map(p => {
          const courseId = p.courseId;
          const lessonIds = safeObjectKeys(p.progress);
          return lessonIds.map(lessonId => ({ courseId, lessonId, ...p.progress[lessonId] }));
        })
        .flat()
        .sort((a, b) => +a.lastSolvedAt - +b.lastSolvedAt)
        .at(-1);
      if (!lastSolvedLessonProgress) {
        if (!randomAccessedCourseId) {
          return null;
        }

        return (await courseService._fetch({ ids: [randomAccessedCourseId] })).at(0) ?? null;
      }
      const { courseId } = lastSolvedLessonProgress;
      return (await courseService._fetch({ ids: [courseId] })).at(0) ?? null;
    } catch (error) {
      console.log('Fetch first last studied course', { error });
      throw error;
    }
  }

  protected _lastStudiedCourseBS = new BehaviorSubject<ICourseData | null>(null);
}

export const userCourseProgressService = new UserCourseProgressService();
(window as any).userCourseProgressService = userCourseProgressService;
export default UserCourseProgressService;
