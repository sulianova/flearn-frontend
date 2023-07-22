import { put } from 'redux-saga/effects';
import { envService, firebaseService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { courseLocalData } from 'edit-files/course.localdata';

import type { ICourseData, ICourseState, TAction } from 'types';

export interface ISaveCoursePayload {
  courseId: string
}

export const saveCourse = createAction<'saga', ISaveCoursePayload>(
  '***saga*** save Course',
  function* execute(action: TAction<ISaveCoursePayload>) {
    try {
      const { courseId } = action.payload;
      const fileIsPresentLocally = courseLocalData.courseMeta.courseId === courseId;

      if (envService.dataMode !== 'EDIT' || !fileIsPresentLocally) {
        throw new Error();
      }

      const remoteData: ICourseData | undefined = yield firebaseService.setCourse(courseId, courseLocalData.courseData);

      console.log('saved data: ', remoteData);
      if (!remoteData) {
        throw new Error();
      }

      const newState: ICourseState = {
        data: remoteData,
        courseIsStoredLocally: false,
      };

      yield put(updateState({ stateName: 'course', payload: newState }));
    } catch(e) {
      console.log(`Faild to save course: ${action.payload.courseId}, courseData: `, courseLocalData.courseData);
    }
  }
);
