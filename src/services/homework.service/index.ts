import { BehaviorSubject, CompletionObserver, ErrorObserver, NextObserver, Subject } from 'rxjs';

import { dataService } from 'services/data.service';

import type { IUserData } from 'services/user.service';
import type { TActionS } from './types';
import type { IHomeworkData, IHomeworkDataDB, IHomeworkDataWPopulate } from 'types';
import { ECommonErrorTypes } from 'types';
import { homeworkConverter } from 'services/data.service/Homework/homeworkConverter';
import { reviewDB2FR } from 'services/utils/homework';

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

type TReview = {
  homeworkId: string
  review: IHomeworkDataDB['review']
}

const review11: TReview = {
  homeworkId: 'how-to-draw-free_HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35_hw-FhEwHm2rg4dqGzqMjiRhfFhgEIk1',
  review: [
    { type: 'text', text: 'Вы очень здорово порисовали на этой неделе! Много экспериментов с разными линиями, фактурами, ограничениями на рисунок.' },
    { type: 'text', text: '"Нет ничего лучше того варианта, что получился в итоге" — очень здоровый, рабочий подход.' },
    { type: 'text', text: 'По ссылке ниже холст с вашими рисунками и моими комментариями. Чтобы отвечать на комменты, вести диалог, нужно залогиниться под любой почтой.' },
    { type: 'text',
      text: [
        {
          tag: 'a',
          content: 'Комментарии к рисункам в Figma',
          props: { className: 'link', target: "_blank", to: 'https://www.figma.com/file/M8SeWVu0YzLQgbX44Z8zMc/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%B0%D0%BD%D0%B0-%D0%91%D0%BB%D0%BE%D0%BA?type=design&node-id=0%3A1&mode=design&t=k8bLivLrhG0qyev1-1' },
        },
      ]}

  ],
};

const review12: TReview = {
  homeworkId: 'how-to-draw-free_HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35_hw-h3MpdAbMR0bd3Vx1r4S5OX5kxeE3',
  review: [
    { type: 'text', text: 'Добрый день! Не уметь рисовать — нормально. Я не умею рисовать портреты. И это понятно, у меня мало опыта, вот я и не умею. Приятная новость в том что, чтобы рисовать портреты, не надо "уметь рисовать". Надо брать и рисовать.' },
    { type: 'text', text: 'Вы большая молодец! На этой неделе у вас получилось сделать 14 рисунков, которыми вы захотели поделиться с другими! Это в бесконечное количество раз лучше, чем не нарисовать ничего.' },
    { type: 'text', text: '"Но, дальше теории стало для меня много, это моя постоянная проблема, устать от теории до рисования." – много теории, не читайте теорию. Открывайте сразу страницу с заданием и делайте задание. Если в процессе поймете, что чего-то не хватает, точечно открывайте теорию. Или вообще забудьте про теорию, задавайте вопросы в чате. Я подскажу, пришлю примеры.' },
    { type: 'text', text: '"Вот похоже я так напрягаюсь, от внимания, что прям устала от четырех набросков." – вот здесь хочется разобраться. Подходит ли вам такая усталость. Если это некомфортно, так не нравится, с этим стоит поработать. Сейчас у вас подробные, детализированные работы. А что если ограничить рисунок 10 линиями? А что если рисовать строго за 1 минуту? Или любое другое ограничение, которое просто не даст возможности углубиться в детали и похожесть.' },
    { type: 'text', text: 'Можно попробовать порисовать "законные, трушные каракули". Например, как у Лены Новоселовой.' },
    {
      type: 'image',
      imageData: {
        id: 'ElenaNovoselova1.jpeg',
        alt: 'ElenaNovoselova1',
        caption: [
          {
            tag: 'a',
            content: 'Elena Novoselova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/novoelena/' },
          },
        ],
      },
    },
    { type: 'text', text: 'По ссылке ниже холст с вашими рисунками и моими комментариями. Чтобы отвечать на комменты, вести диалог, нужно залогиниться под любой почтой.' },
    { type: 'text',
      text: [
        {
          tag: 'a',
          content: 'Комментарии к рисункам в Figma',
          props: { className: 'link', target: "_blank", to: 'https://www.figma.com/file/31RgMQN19zdFPgEfgbCpbr/%D0%98%D1%80%D0%B8%D0%BD%D0%B0-%D0%94?type=design&node-id=1%3A8&mode=design&t=LD9x5XawrZaSNMv8-1' },
        },
      ]}

  ],
};

const review13: TReview = {
  homeworkId: 'how-to-draw-free_HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35_hw-xAjP5m8ZJHWvYPPH7AzR2hoLc1C2',
  review: [
    { type: 'text', text: 'Я в восторге от того, сколько вы нарисовали работ! Вы большая умничка)' },
    { type: 'text', text: '' },
    { type: 'text', text: 'По ссылке ниже холст с вашими рисунками и моими комментариями. Чтобы отвечать на комменты, вести диалог, нужно залогиниться под любой почтой.' },
    { type: 'text',
      text: [
        {
          tag: 'a',
          content: 'Комментарии к рисункам в Figma',
          props: { className: 'link', target: "_blank", to: 'https://www.figma.com/file/gk0H58IeWAnmP97afPTlS5/Wambanuka?type=design&node-id=0%3A1&mode=design&t=12FcIExJxfhxzxW7-1' },
        },
      ]}

  ],
};

const review21: TReview = {
  homeworkId: 'how-to-draw-free_SpotPractice_kfKAEY_hw-FhEwHm2rg4dqGzqMjiRhfFhgEIk1',
  review: [
    { type: 'text', text: 'Добрый день! У вас здорово получается экспериментировать с материалами. Все котики очень-очень хорошие.' },
    { type: 'text', text: '"слушала себя и рисовала как чувствовала" — очень рада, что у вас получилось переключиться на себя! Это правильный подход.' },
    { type: 'text', text: 'По ссылке ниже холст с вашими рисунками и моими комментариями. Чтобы отвечать на комменты, вести диалог, нужно скачать на телефон приложение Figma и залогиниться под любой почтой.' },
    { type: 'text',
      text: [
        {
          tag: 'a',
          content: 'Комментарии к рисункам в Figma',
          props: { className: 'link', target: "_blank", to: 'https://www.figma.com/file/M8SeWVu0YzLQgbX44Z8zMc/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%B0%D0%BD%D0%B0-%D0%91%D0%BB%D0%BE%D0%BA?type=design&node-id=0%3A1&mode=design&t=6c9IgStQ2iqtBIBK-1' },
        },
      ]}

  ],
};

const allReviews = [
  review11,
  review12,
  review13,
  review21,
];

function getReview(filter: { homeworkId: string }) {
  return allReviews.find(({ homeworkId }) => homeworkId === filter.homeworkId)?.review;
}
