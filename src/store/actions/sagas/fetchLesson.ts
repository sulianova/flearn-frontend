import { call, put } from 'redux-saga/effects';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonData, ILessonState, TAction } from 'types';

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export interface IFetchLessonPayload {
  lessonId?: string
}

export const fetchLesson = createAction<'saga', IFetchLessonPayload>(
  '***saga*** fetch Lesson',
  function* execute(action: TAction<IFetchLessonPayload>) {
    yield call(delay, 1000);
    const { lessonId } = action.payload;

    if (!lessonId) {
      throw Error(`cant fetch id ${lessonId}`);
    }

    const data: ILessonData = yield call(getData, lessonId);

    yield put(updateState({ stateName: 'lesson', payload: { data } }));
  }
);

function getData(lessonId: string) {
  return allLessons.find(l => l.id === lessonId);
}

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
