import { call, put } from 'redux-saga/effects';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonsState } from 'types';

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export const fetchLessons = createAction<'saga'>(
  '***saga*** fetch Lessons',
  function* execute() {
    yield call(delay, 1000);

    const data: ILessonsState = yield call(getData);

    yield put(updateState({ stateName: 'lessons', payload: data }));
  }
);

function getData() {
  return courseData;
}

const courseData: ILessonsState = {
  courseInfo: {
    startDate: new Date('2023-05-27'),
    durationWeeks: 5,
    title: 'Как рисовать свободно',
  },
  lessonsInfo: [
    {
      title: 'Первая тема',
      dates: '12–16 июня',
      lectureLink: 'lesson.html',
    },
    {
      title: 'Вторая тема',
      dates: '16–20 июня',
      lectureLink: 'lesson.html',
      homeworkLink: 'homework.html',
      resultsLink: 'homework-editor.html',
    },
    {
      title: 'Третья самая интересная тема',
      dates: '20–17 июня',
      lectureLink: 'lesson.html',
      homeworkLink: 'homework.html',
      webinarLink: 'homework.html',
      resultsLink: 'homework-editor.html',
    },
  ],
};
