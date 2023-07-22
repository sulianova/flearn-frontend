import { call, put } from 'redux-saga/effects';
import { envService, firebaseService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { courseLocalData } from 'edit-files/course.localdata';

import type { ICourseData, ICourseState, TAction } from 'types';

const delay = async (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export interface IFetchCoursePayload {
  courseId: string
}

export const fetchCourse = createAction<'saga', IFetchCoursePayload>(
  '***saga*** fetch Course',
  function* execute(action: TAction<IFetchCoursePayload>) {
    try {
      const { courseId } = action.payload;
      const fileIsPresentLocally = courseLocalData.courseMeta.courseId === courseId;

      let data: ICourseData | undefined;
      let courseIsStoredLocally: boolean | undefined;

      if (envService.dataMode === 'EDIT' && fileIsPresentLocally) {
        yield call(delay, 1000);
        data = courseLocalData.courseData;
        courseIsStoredLocally = true;
      } else {
        data = yield firebaseService.getCourse(courseId);
        courseIsStoredLocally = false;
      }

      if (!data) {
        throw new Error();
      }

      const newState: ICourseState = {
        data,
        courseIsStoredLocally,
      };

      yield put(updateState({ stateName: 'course', payload: newState }));
    } catch(e) {
      console.log(`Faild to fetch course: ${action.payload.courseId}`);
    }
  }
);
