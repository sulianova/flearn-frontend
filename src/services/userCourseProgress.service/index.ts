import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject, merge } from 'rxjs';

import { dataService } from 'services/data.service';

import type { TActionBS, TActionS } from './types';
import { authService } from 'services/auth.service';
import { safeObjectKeys } from 'utils';
import { lessonService } from 'services/lesson.service';
import { useLastSolvedLesson } from './useLastSolvedLesson';

export type { TProgress, TProgressDB, TUserCourseProgress, TUserCourseProgressDB } from './types';

class UserCourseProgressService {
  public useLastSolvedLesson = useLastSolvedLesson;

  public async markLessonAsRead(courseId: string, userEmail: string, lessonId: string) {
    try {
      await dataService.userCourseProgress.markLessonAsRead(courseId, userEmail, lessonId);
      this.userCourseProgresS.next({ type: 'updated', payload: { courseId, lessonId }});
    } catch (error) {
      console.log('Failed to mark lesson as read', { error });
      throw error;
    }
  }

  protected getLastSolvedLessonBS() {
    try {
      const mainSubject = new BehaviorSubject<TActionBS>(null);

      const fetch = async () => {
        try {
          mainSubject.next(null);
          const lesson = await this.fetchLastSolvedLesson();
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
      console.error('Failed to subscribe for last solved lesson');
      throw err;
    }
  }

  private async fetchLastSolvedLesson() {
    try {
      const authedUser = authService.user;
      if (!authedUser) {
        throw new Error('Not authenticated');
      }
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
        return null;
      }
      const { courseId, lessonId } = lastSolvedLessonProgress;
      const lastSolvedLesson = (await lessonService.fetch({ courseId, id: lessonId })).at(0);
      if (!lastSolvedLesson) {
        return null;
      }
      return lastSolvedLesson;
    } catch (error) {
      console.log('Fetch last solved lesson', { error });
      throw error;
    }
  }

  private userCourseProgresS = new Subject<TActionS>();
}

export const userCourseProgressService = new UserCourseProgressService();
(window as any).userCourseProgressService = userCourseProgressService;
export default UserCourseProgressService;
