import { put, select } from 'redux-saga/effects';

import { dataService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from 'store/actions/redux';

import { ECommonErrorTypes } from 'types';
import type { ICourseData, ILessonData, ILessonsData, ILessonsState, IRootState, TAction } from 'types';

export interface IFetchLessonsPayload {
  filter: {
    courseId: string
  }
  populate?: {
    course?: boolean
  }
}

export const fetchLessons = createAction<'saga', IFetchLessonsPayload>(
  '***saga*** fetch Lessons',
  function* execute(action: TAction<IFetchLessonsPayload>) {
    const { filter, populate } = action.payload;

    try {
      const prevState: ILessonsState = yield select((state: IRootState): ILessonsState => state.lessons);
      const pendingState: ILessonsState = { ...prevState, state: { type: 'pending' } };
      yield put(updateState({ stateName: 'lessons', payload: pendingState }));

      // fetch lessons
      const lessonsData: ILessonData[] = yield dataService.lesson.getAll(filter);

      // populate
      let populateMap: Map<string, ILessonsData['populate']>;
      if (populate) {
        populateMap = new Map();

        let populateCourseMap: Map<string, ICourseData>;
        if (populate.course) {
          const courseIds = [...new Set(lessonsData.map(l => l.courseId))];
          const coursesData: ICourseData[] = yield dataService.course.getAll(courseIds);
          populateCourseMap = new Map(coursesData.map(c => [c.id, c] as const));
        }
        // add here other populated values

        // fill populate map
        for (const lesson of lessonsData) {
          populateMap.set(lesson.id, {
            ...populateCourseMap! && { course: populateCourseMap.get(lesson.courseId) }
          });
        }
      }
      const lessons: ILessonsData[] = lessonsData.map(lesson => ({
        lesson,
        ...populateMap && { populate: populateMap.get(lesson.id) },
      }));
    
      const state: ILessonsState = { lessons, state: { type: 'idle' } };

      yield put(updateState({ stateName: 'lessons', payload: state }));
    } catch (err) {
      const error = err as Error;
      const errorIsUnknown = !([...Object.values(ECommonErrorTypes)] as string[]).includes(error.message);
      const state: ILessonsState = {
        lessons: [],
        state: {
          type: 'error',
          error,
          errorType: errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes
        },
      };
  
      yield put(updateState({ stateName: 'lessons', payload: state }));

      // tslint:disable-next-line
      console.log(`Failed to fetch lessons`, { action, state });
    }
  }
);

// function getCourseInfo() {
//   return courseInfo;
// }

// function getLessonsInfo() {
//   return lessonsInfo;
// }

// const courseInfo: ICourseInfo = {
//   startDate: new Date('2023-05-27'),
//   endDate: new Date('2023-06-27'),
//   durationWeeks: 5,
//   title: 'Как рисовать свободно',
// };

// const lessonsInfo: ILessonInfoDB[] = [
//   {
//     title: 'Первая тема',
//     week: 1,
//     lectureLink: 'lesson.html',
//   },
//   {
//     title: 'Вторая тема',
//     week: 1,
//     lectureLink: 'lesson.html',
//     homeworkLink: 'homework.html',
//     resultsLink: 'homework-editor.html',
//   },
//   {
//     title: 'JJOHIU тема',
//     week: 2,
//     lectureLink: 'lesson.html',
//     homeworkLink: 'homework.html',
//     resultsLink: 'homework-editor.html',
//   },
//   {
//     title: 'Третья самая интересная тема',
//     week: 3,
//     lectureLink: 'lesson.html',
//     homeworkLink: 'homework.html',
//     webinarLink: 'homework.html',
//     resultsLink: 'homework-editor.html',
//   },
// ];
