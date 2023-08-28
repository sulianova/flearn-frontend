import { put, select } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { ELessonErrorTypes, ILessonData, ILessonState, IRootState, TAction } from 'types';

export interface IFetchLessonPayload {
  courseId: string
  lessonId: string
  source?: 'local' | 'remote'
}

export const fetchLesson = createAction<'saga', IFetchLessonPayload>(
  '***saga*** fetch Lesson',
  function* execute(action: TAction<IFetchLessonPayload>) {
    const { courseId, lessonId, source = 'remote' } = action.payload;

    const prevState: ILessonState = yield select((state: IRootState): ILessonState => state.lesson);
    const pendingState: ILessonState = { ...prevState, state: { type: 'pending' } };
    yield put(updateState({ stateName: 'lesson', payload: pendingState }));

    try {
      if (source === 'remote') {
        const data: ILessonData = yield dataService.lesson.get(courseId, lessonId);
  
        const state: ILessonState = { courseId, lessonId, source, data, state: { type: 'idle' } };
  
        yield put(updateState({ stateName: 'lesson', payload: state }));
      } else {
        const fullId = dataService.lesson.getFullId(courseId, lessonId);
        let file: any
        try {
          // @ts-ignore
          file = yield import(`edit-files/lesson-${fullId}.json`);
        } catch (e) {
          throw new Error(ELessonErrorTypes.FailedToFindLesson);
        }

        const isValid = localFilesServise.Lesson.test(file.lessonData);
        if (!isValid) {
          throw new Error(ELessonErrorTypes.LessonDataIsCorrupted);
        }
        const data = localFilesServise.Lesson.localToFR(file.lessonData);
        if (!data) {
          throw new Error(ELessonErrorTypes.LessonDataIsCorrupted);
        }
        const state: ILessonState = { courseId, lessonId, source, data, state: { type: 'idle' } };
  
        yield put(updateState({ stateName: 'lesson', payload: state }));
      }
    } catch(e) {
      const error = e as Error;
      const errorIsUnknown = !(Object.values(ELessonErrorTypes) as string[]).includes(error.message);
      const state: ILessonState = {
        courseId,
        lessonId,
        source,
        data: undefined,
        state: {
          type: 'error',
          error,
          errorType: errorIsUnknown ? ELessonErrorTypes.Other : error.message as ELessonErrorTypes
        },
      };
  
      yield put(updateState({ stateName: 'lesson', payload: state }));

      const fullId = dataService.lesson.getFullId(action.payload.courseId, action.payload.lessonId);
      // tslint:disable-next-line
      console.log(`Faild to fetch lesson: ${fullId}`, state);
    }
  }
);

const lessonData1: ILessonData = {
  id: '1',
  title: 'Тема первая',
  type: 'Theory',
  startDate: new Date('2023.07.12'),
  endDate: new Date('2023.07.22'),
  lectureLink: 'string',
  homeworkLink: 'string',
  webinarLink: 'string',
  resultsLink: 'string',
  content: [
    {
      type: 'title',
      title: 'Супер интересная подтема подтема',
    },
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/ag6PuGjJdbU?loop=1',
        title: 'YouTube video player',
        caption: [
          {
            tag: 'a',
            content: 'Книжный разворот',
            props: { className: 'link', to: 'https://google.com' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Супер интересная подтема подтема',
    },
    {
      type: 'text',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'text',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'textImportant',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'text',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'factoid',
      factoid: [
        {
          tag: 'a',
          content: 'Книжный разворот',
          props: { className: 'link', to: 'https://google.com' },
        },
        {
          tag: 'a',
          content: 'Книжный разворот',
          props: { className: 'link', to: 'https://google.com' },
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        src: 'TheStrangerVisitingNatureSusl',
        alt: 'YouTube video player',
        caption: [
          {
            tag: 'a',
            content: 'Книжный разворот',
            props: { className: 'link', to: 'https://google.com' },
          },
        ],
      },
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля ',
        },
        {
          tag: 'p',
          content: 'Книжный разворот',
        },
      ],
    },
    {
      type: 'factoid',
      factoid: [
        {
          tag: 'p',
          content: 'Книжный разворот это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы',
        },
        {
          tag: 'p',
          content: 'Книжный разворот',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        src: 'SummerTime',
        alt: 'YouTube video player',
      },
    },
  ],
};

const lessonData2: ILessonData = {
  id: '2',
  title: 'Тема первая',
  type: 'Practice',
  startDate: new Date('2023.07.12'),
  endDate: new Date('2023.07.22'),
  lectureLink: 'string',
  homeworkLink: 'string',
  webinarLink: 'string',
  resultsLink: 'string',
  content: [
    {
      type: 'title',
      title: 'Супер интересная подтема подтема',
    },
    {
      type: 'text',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'text',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'textImportant',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'text',
      text: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля симметричны, текст стремится к центру:',
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля ',
        },
        {
          tag: 'p',
          content: 'Книжный разворот',
        },
      ],
    },
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/ag6PuGjJdbU?loop=1',
        title: 'YouTube video player',
        caption: [
          {
            tag: 'a',
            content: 'Книжный разворот',
            props: { className: 'link', to: 'https://google.com' },
          },
        ],
      },
    },
  ],
};

const allLessons = [
  lessonData1,
  lessonData2,
];
