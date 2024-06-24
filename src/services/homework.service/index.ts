import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';
import { userService, type IUserData } from 'services/user.service';
import { reviewDB2FR } from 'services/utils/homework';

import type { IFetchHomeworksProps, IHomeworkData, IHomeworkDataWPopulate, TActionS } from './types';
import { getReview } from './data';
import useHomeworks from './useHomeworks';
import { emailService } from 'services/email.service';
import { courseService } from 'services/course.service';
import { lessonService } from 'services/lesson.service';

export * from './types';

class HomeworkService {
  public useHomeworks = useHomeworks;
  public getHomeworkBS(props: IFetchHomeworksProps) {
    try {
      type TAction = null | { homeworks: IHomeworkDataWPopulate[] } | Error;
      const mainSubject = new BehaviorSubject<TAction>(null);

      const fetchHomeworks = async () => {
        try {
          mainSubject.next(null);
          const r = await this._fetch(props);
          mainSubject.next(r);
        } catch (err) {
          mainSubject.next(err as Error);
        }
      };

      return {
        ...mainSubject,
        subscribe: (
          observer?:
            | NextObserver<TAction>
            | ErrorObserver<TAction>
            | CompletionObserver<TAction>
            | undefined
        ) => {
          fetchHomeworks();

          const homeworksUpdatedSubscription = this._homeworkS.subscribe(async e => {
            try {
              fetchHomeworks();
            } catch (err) {
              /* error already handled */
            }
          });

          const mainSubjectSubscription = mainSubject.subscribe(observer);
          return {
            ...mainSubjectSubscription,
            unsubscribe: () => {
              mainSubjectSubscription?.unsubscribe();
              homeworksUpdatedSubscription?.unsubscribe();
            },
          };
        },
      } as BehaviorSubject<TAction>;
    } catch (err) {
      console.error('Failed to subscribe for homeworks', { props });
      throw err;
    }
  }

  public async submitHomework(props: { courseId: string, lessonId: string, userId: string, externalHomeworkLink: string }) {
    const id = dataService.homework.getFullId(props.courseId, props.lessonId, props.userId);
    const newHomework: IHomeworkData = {
      id: id,
      userId: props.userId,
      courseId: props.courseId,
      lessonId: props.lessonId,
      description: '',
      externalHomeworkLink: props.externalHomeworkLink,
      images: [],
      state: 'SENT_FOR_REVIEW',
    };

    await dataService.homework.create(id, newHomework);

    this.sendSubmitHomeworkEmails(newHomework);

    this._homeworkS.next({ type: 'created', payload: { id, ...props } });
  }

  public async submitReview(props: { homeworkId: string, reviewLink: string }) {
    try {
      const { homeworkId, reviewLink } = props;
      await this.patchHomework(homeworkId, { reviewLink, state: 'REVIEWED' });
      this.sendSumbitReviewEmails(homeworkId);
    } catch (error) {
      console.log('Failed to submit review', { props, error });
      throw error;
    }
  }

  public async patchHomework(id: string, patch: Partial<IHomeworkData>) {
    await dataService.homework.patch(id, patch);
    this._homeworkS.next({ type: 'updated', payload: { id } });
  }

  public async getHomework(props: { courseId: string, lessonId: string, userId: string } | string) {
    return dataService.homework.get(props);
  }

  private async sendSubmitHomeworkEmails(hw: IHomeworkData) {
    try {
      const user = await userService.getAuthenticatedUser();
      const course = (await courseService._fetch({ ids: [hw.courseId] })).at(0);
      const lesson = (await lessonService.fetch({ courseId: hw.courseId, id: hw.lessonId })).at(0);
      if (!user) {
        throw new Error('Not authenticated');
      }
      if (!course) {
        throw new Error('Failed to fetch course');
      }
      if (!lesson) {
        throw new Error('Failed to fetch lesson');
      }
      await emailService.sendEmail({
        type: emailService.EEmail.HomeworkSentForReview,
        to: user,
        course,
        lesson,
      });
      await emailService.sendEmail({
        type: emailService.EEmail.HomeworkSentForReviewToReviewer,
        course,
        lesson,
        homework: hw,
        homeworkUser: user,
      });
    } catch (error) {
      console.log('Failed to send submitHomeworkEmails', { hw, error });
      throw error;
    }
  }

  private async sendSumbitReviewEmails(homeworkId: string) {
    try {
      const homework = await this.getHomework(homeworkId);
      const { courseId, lessonId, reviewLink, state } = homework;
      const user = await userService.getAuthenticatedUser();
      const course = (await courseService._fetch({ ids: [courseId] })).at(0);
      const lesson = (await lessonService.fetch({ courseId, id: lessonId })).at(0);
      if (!user) {
        throw new Error('Not authenticated');
      }
      if (!course) {
        throw new Error('Failed to fetch course');
      }
      if (!lesson) {
        throw new Error('Failed to fetch lesson');
      }
      if (state !== 'REVIEWED') {
        throw new Error(`HW State is "${state}" and not "REVIEWED"`);
      }
      if (!reviewLink) {
        throw new Error('HW doesnot have "reviewLink"');
      }
      await emailService.sendEmail({
        type: emailService.EEmail.HomeworkReviewed,
        to: user,
        course,
        lesson,
        reviewLink: reviewLink,
      });
      await emailService.sendEmail({
        type: emailService.EEmail.HomeworkReviewedToReviewer,
        course,
        lesson,
        homeworkUser: user,
        reviewLink,
      });
    } catch (error) {
      console.log('Failed to send SumbitReviewEmails', { homeworkId, error });
      throw error;
    }
  }

  // public generateImageId(props: { originalName: string }) {
  //   return dataService.homework.generateImageId(props);
  // }

  // public async getImageURL(props: { courseId: string, lessonId: string, userId: string, imageId: string }) {
  //   return dataService.homework.getImageURL(props);
  // }

  // public async uploadImage(props: { courseId: string, lessonId: string, userId: string, imageId: string, file: File }) {
  //   return dataService.homework.uploadImage(props);
  // }

  // public async deleteImage(props: { courseId: string, lessonId: string, userId: string, imageId: string }) {
  //   return dataService.homework.deleteImage(props);
  // }

  public getFullId(props: { courseId: string, lessonId: string, userId: string }) {
    return dataService.homework.getFullId(props.courseId, props.lessonId, props.userId);
  }

  // public errorToType(error: Error) {
  //   const errorIsUnknown = !([...Object.values(ECommonErrorTypes)] as string[]).includes(error.message);
  //   const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes;

  //   return errorType;
  // }

  private async _fetch(props: IFetchHomeworksProps) {
    try {
      const homeworksData = await dataService.homework.getAll(props.filter);

      // populate
      let populateMap: Map<string, IHomeworkDataWPopulate['populate']>;
      if (props.populate) {
        populateMap = new Map();

        let populateUserMap: Map<string, IUserData>;
        if (props.populate.user) {
          const userIds = [...new Set(homeworksData.map(l => l.userId))];
          const usersData = await dataService.user.getAll({ ids: userIds });
          populateUserMap = new Map(usersData.map(c => [c.id, c] as const));
        }
        // add here other populated values

        // fill populate map
        for (const homework of homeworksData) {
          populateMap.set(homework.id, {
            ...populateUserMap! && { user: populateUserMap.get(homework.userId) }
          });
        }
      }

      // add local review if needed
      let reviewMap: Map<string, IHomeworkData['review']>;
      if (props.reviewSource === 'local') {
        reviewMap = new Map();
        for (const homework of homeworksData) {
          const review = getReview({ homeworkId: homework.id });
          reviewMap.set(homework.id, review && await reviewDB2FR({ ...homework, review }));
        }
      }

      const homeworks: IHomeworkDataWPopulate[] = homeworksData.map(homework => ({
        homework: {
          ...homework,
          ...reviewMap && reviewMap.has(homework.id) && { review: reviewMap.get(homework.id) },
        },
        ...populateMap && { populate: populateMap.get(homework.id) },
      }));

      return { homeworks };
    } catch (err) {
      // tslint:disable-next-line
      console.log(`Failed to fetch homeworks`, { props, err });
      throw err;
    }
  }

  private _homeworkS = new Subject<TActionS>;
}

export const homeworkService = new HomeworkService();
export default HomeworkService;
(window as any).homeworkService = homeworkService;
