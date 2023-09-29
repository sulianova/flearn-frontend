import { call, put } from 'redux-saga/effects';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { lessonInfoDB2FR } from './utils';

import type { ICourseInfo, ILessonInfo, ILessonInfoDB, ILessonsState } from 'types';

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export const fetchLessons = createAction<'saga'>(
  '***saga*** fetch Lessons',
  function* execute() {
    yield call(delay, 1000);

    const courseInfo: ICourseInfo = yield call(getCourseInfo);
    const lessonsInfoDB: ILessonInfoDB[] = yield call(getLessonsInfo);
    const lessonsInfo: ILessonInfo[] = lessonsInfoDB.map(l => lessonInfoDB2FR(l, courseInfo));
    const state: ILessonsState = {
      courseInfo,
      lessonsInfo,
    };

    yield put(updateState({ stateName: 'lessons', payload: state }));
  }
);

function getCourseInfo() {
  return courseInfo;
}

function getLessonsInfo() {
  return lessonsInfo;
}

const courseInfo: ICourseInfo = {
  startDate: new Date('2023-05-27'),
  durationWeeks: 5,
  title: 'Как рисовать свободно',
};

const lessonsInfo: ILessonInfoDB[] = [
  {
    title: 'Первая тема',
    week: 1,
    lectureLink: 'lesson.html',
  },
  {
    title: 'Вторая тема',
    week: 1,
    lectureLink: 'lesson.html',
    homeworkLink: 'homework.html',
    resultsLink: 'homework-editor.html',
  },
  {
    title: 'JJOHIU тема',
    week: 2,
    lectureLink: 'lesson.html',
    homeworkLink: 'homework.html',
    resultsLink: 'homework-editor.html',
  },
  {
    title: 'Третья самая интересная тема',
    week: 3,
    lectureLink: 'lesson.html',
    homeworkLink: 'homework.html',
    webinarLink: 'homework.html',
    resultsLink: 'homework-editor.html',
  },
];
