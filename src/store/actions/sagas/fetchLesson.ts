import { call, put } from 'redux-saga/effects';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonData, ILessonState } from 'types';

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export const fetchLesson = createAction<'saga'>(
  '***saga*** fetch Lesson',
  function* execute() {
    yield call(delay, 1000);

    const data: ILessonData = yield call(getData);

    yield put(updateState({ stateName: 'lesson', payload: { data } }));
  }
);

function getData() {
  return lessonData;
}

const lessonData: ILessonData = {
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
      type: 'image',
      imageData: {
        src: 'SummerTime',
        alt: 'YouTube video player',
      },
    },
  ],
};
