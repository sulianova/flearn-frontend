import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionBS, TActionS } from './types';
import { authService } from 'services';
import { safeObjectKeys } from 'utils';
import { ILessonData, lessonService } from 'services/lesson.service';
import useFirstNotSolvedLesson from './useFirstNotSolvedLesson';

export type { TProgress, TProgressDB, TUserCourseProgress, TUserCourseProgressDB } from './types';

class UserCourseProgressService {
  public useFirstNotSolvedLesson = useFirstNotSolvedLesson;

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
        this._firstNotSolvedLessonBS.next(null);
        return;
      }

      this.fetchFirstNotSolvedLesson()
        .then(lesson => {
          this._firstNotSolvedLessonBS.next(lesson);
        })
        .catch(error => {
          console.log('Failed to fetch FirstNotSolvedLesson for _firstNotSolvedLessonBS', { error, user });
          this._firstNotSolvedLessonBS.next(null);
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

  protected getFirstNotSolvedLessonBS() {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetch = async () => {
        try {
          mainSubject.next(null);
          const lesson = await this.fetchFirstNotSolvedLesson();
          mainSubject.next(lesson);
        } catch (err) {
          mainSubject.next(err as Error);
        }
      };

      return {
        ...mainSubject,
        subscribe: (
          observer?:
            | NextObserver<TActionBS>
            | ErrorObserver<TActionBS>
            | CompletionObserver<TActionBS>
            | undefined
        ) => {
          fetch();

          const dependenciesSubscription = merge(
              this.userCourseProgresS,
              authService.firebaseUserBS,
            )
            .subscribe(fetch);

          const mainSubjectSubscription = mainSubject.subscribe(observer);
          return {
            ...mainSubjectSubscription,
            unsubscribe: () => {
              mainSubjectSubscription?.unsubscribe();
              dependenciesSubscription?.unsubscribe();
            },
          };
        },
      } as BehaviorSubject<TActionBS>;
    } catch (err) {
      console.error('Failed to subscribe for first not solved lesson');
      throw err;
    }
  }

  private async fetchFirstNotSolvedLesson() {
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

        return (await lessonService.fetch({ courseId: randomAccessedCourseId, topicOrder: 1, orderInTopic: 1 })).at(0) ?? null;
      }
      const { courseId, lessonId } = lastSolvedLessonProgress;
      const lastSolvedLesson = (await lessonService.fetch({ courseId, id: lessonId })).at(0)!;
      return await lessonService.fetchNextLesson(lastSolvedLesson);
    } catch (error) {
      console.log('Fetch first not solved lesson', { error });
      throw error;
    }
  }

  protected userCourseProgresS = new Subject<TActionS>();
  protected _firstNotSolvedLessonBS = new BehaviorSubject<ILessonData | null>(null);
}

export const userCourseProgressService = new UserCourseProgressService();
(window as any).userCourseProgressService = userCourseProgressService;
export default UserCourseProgressService;
