import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import type { IUserData } from 'services/user.service';
import type { TActionS } from './types';
import type { IHomeworkData, IHomeworkDataWPopulate } from 'types';
import { ECommonErrorTypes } from 'types';

class HomeworkService {
  public async getHomeworkBS(props: {
    filter: { courseId: string } & Partial<Pick<IHomeworkData, 'id'| 'lessonId' | 'userId' | 'state'>>
    populate?: { user?: boolean }
    reviewSource?: 'local' | 'remote'
  }) {
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

  public async createHomework(props: { courseId: string, lessonId: string, userId: string }) {
    const id = dataService.homework.getFullId(props.courseId, props.lessonId, props.userId);
    const newHomework: IHomeworkData = {
      id: id,
      userId: props.userId,
      courseId: props.courseId,
      lessonId: props.lessonId,
      description: '',
      externalHomeworkLink: '',
      images: [],
      state: 'DRAFT',
    };

    await dataService.homework.create(id, newHomework);

    this._homeworkS.next({ type: 'created', payload: { id, ...props } });
  }

  public async patchHomework(id: string, patch: Partial<IHomeworkData>) {
    await dataService.homework.patch(id, patch);
    this._homeworkS.next({ type: 'updated', payload: { id } });
  }

  public async getHomework(props: { courseId: string, lessonId: string, userId: string }) {
    return dataService.homework.get(props.courseId, props.lessonId, props.userId);
  }

  public generateImageId(props: { originalName: string }) {
    return dataService.homework.generateImageId(props);
  }

  public async getImageURL(props: { courseId: string, lessonId: string, userId: string, imageId: string }) {
    return dataService.homework.getImageURL(props);
  }

  public async uploadImage(props: { courseId: string, lessonId: string, userId: string, imageId: string, file: File }) {
    return dataService.homework.uploadImage(props);
  }

  public async deleteImage(props: { courseId: string, lessonId: string, userId: string, imageId: string }) {
    return dataService.homework.deleteImage(props);
  }

  public getFullId(props: { courseId: string, lessonId: string, userId: string }) {
    return dataService.homework.getFullId(props.courseId, props.lessonId, props.userId);
  }

  public errorToType(error: Error) {
    const errorIsUnknown = !([...Object.values(ECommonErrorTypes)] as string[]).includes(error.message);
    const errorType = errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes;

    return errorType;
  }

  private async _fetch(props: {
    filter: { courseId: string } & Partial<Pick<IHomeworkData, 'id'| 'lessonId' | 'userId' | 'state'>>
    populate?: { user?: boolean }
    reviewSource?: 'local' | 'remote'
  }) {
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
          reviewMap.set(homework.id, getReview({ homeworkId: homework.id }));
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

type TReview = {
  homeworkId: string
  review: IHomeworkData['review']
}

const review1: TReview = {
  homeworkId: 'how-to-draw_HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35_hw-Qoyv64RbilhFCwmOwyYc41z0ZQH2',
  review: [
    { type: 'text', text: 'Это моё первая обратная связь. И ещё добавь побольше пятен' },
  ],
};

const allReviews = [
  review1
];

function getReview(filter: { homeworkId: string }) {
  return allReviews.find(({ homeworkId }) => homeworkId === filter.homeworkId)?.review;
}
