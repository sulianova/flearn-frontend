import { BehaviorSubject, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';

import { TCurrentCourseProgressBSValue, type TActionS, type TUserCourseProgress } from './types';
import { authService } from 'services';
import { safeObjectKeys } from 'utils';
import useLastStudiedCourse from './useLastStudiedCourse';
import { courseService, ICourseData } from 'services/course.service';
import { locationService } from 'services/location.service';
import { userService } from 'services/user.service';

import useCurrentCourseProgress from './useCurrentCourseProgress';

export type { TProgress, TProgressDB, TUserCourseProgress, TUserCourseProgressDB } from './types';

class UserCourseProgressService {
  public userCourseProgresS = new Subject<TActionS>();
  public useLastStudiedCourse = useLastStudiedCourse;
  public useCurrentCourseProgress = useCurrentCourseProgress;

  constructor() {
    this.initLastStudiedCourseBS();
    this.initCurrentCourseProgressBS();
  }

  public get currentCourseProgress() {
    return this._currentCourseProgressBS.getValue()?.value ?? null;
  }

  public async markLessonAsRead(courseId: string, userEmail: string, lessonId: string) {
    try {
      const progress = await dataService.userCourseProgress.get(courseId, userEmail).catch(_err => undefined);
      const newProgress: TUserCourseProgress = {
        course: {
          lastVisitedAt: new Date(),
        },
        lessons: {
          ...progress?.lessons,
          [lessonId]: {
            solved: true,
            solvedQuizesAmount: progress?.lessons[lessonId]?.solvedQuizesAmount ?? 0,
            lastSolvedAt: new Date(),
          },
        },
      };
      await dataService.userCourseProgress.set({ courseId, userEmail, progress: newProgress });
      this.userCourseProgresS.next({ type: 'updated', payload: { courseId, lessonId }});
    } catch (error) {
      console.log('Failed to mark lesson as read', { error });
      throw error;
    }
  }

  public async saveLessonProgress(params: { courseId: string, userEmail: string, lessonId: string, unlockedBlocks: number}) {
    try {
      const { courseId, userEmail, lessonId, unlockedBlocks } = params;
      const progress = await dataService.userCourseProgress.get(courseId, userEmail).catch(_err => undefined);
      const newProgress: TUserCourseProgress = {
        course: {
          lastVisitedAt: new Date(),
        },
        lessons: {
          ...progress?.lessons,
          [lessonId]: {
            solved: false,
            solvedQuizesAmount: unlockedBlocks,
            lastSolvedAt: new Date(),
          },
        },
      };
      await dataService.userCourseProgress.set({ courseId, userEmail, progress: newProgress });
      this.userCourseProgresS.next({ type: 'updated', payload: { courseId, lessonId }});
    } catch (error) {
      console.log('Failed to save lesson quize progress', { error });
      throw error;
    }
  }

  public async isLessonSolved(courseId: string, userEmail: string, lessonId: string) {
    try {
      return (await dataService.userCourseProgress.get(courseId, userEmail))?.lessons[lessonId]?.solved ?? false;
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

      const userCourseProgreses = await dataService.userCourseProgress.getAll(authedUser.email);
      console.log('fetchLastStudiedCourse', { userCourseProgreses });
      const lastVisitedCourseId = userCourseProgreses
        .sort((a, b) => +a.progress.course.lastVisitedAt - +b.progress.course.lastVisitedAt)
        .at(-1)?.courseId;

      if (!lastVisitedCourseId) {
        return null;
      }

      return (await courseService._fetch({ ids: [lastVisitedCourseId] })).at(0) ?? null;
    } catch (error) {
      console.log('Fetch first last studied course', { error });
      throw error;
    }
  }

  protected initLastStudiedCourseBS() {
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

  protected initCurrentCourseProgressBS() {
    try {
      merge(
        this.userCourseProgresS,
        userService.authedUserBS,
        locationService.URLSectionBS,
      )
      .subscribe(() => {
        const user = userService.authedUserBS.getValue();
        const section = locationService.URLSectionBS.getValue();
        if (!user || (section.name !== 'Profile' && section.name !== 'Study')) {
          this._currentCourseProgressBS.next(null);
          return;
        }
  
        const prevDep = this._currentCourseProgressBS.getValue();
        if (prevDep &&
            (
              prevDep.dependencies.userEmail !== user.email
            ||
              prevDep.dependencies.courseId !== section.params.courseId
            )
        ) {
          this._currentCourseProgressBS.next(null);
        }

        dataService.userCourseProgress.get(section.params.courseId, user.email)
          .then(progress => {
            this._currentCourseProgressBS.next({
              dependencies: {
                courseId: section.params.courseId,
                userEmail: user.email,
              },
              value: progress,
            });
          })
          .catch(error => {
            console.log('Failed to fetch courseProgress for _currentCourseProgressBS', { error, user, section });
            this._currentCourseProgressBS.next(null);
          });
      });
    } catch (error) {
      console.log('Failed to init _currentCourseProgressBS');
      throw error
    }
  }

  protected _lastStudiedCourseBS = new BehaviorSubject<ICourseData | null>(null);
  protected _currentCourseProgressBS = new BehaviorSubject<TCurrentCourseProgressBSValue | null>(null);
}

export const userCourseProgressService = new UserCourseProgressService();
(window as any).userCourseProgressService = userCourseProgressService;
export default UserCourseProgressService;
