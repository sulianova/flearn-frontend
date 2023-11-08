import { put, select } from 'redux-saga/effects';

import { dataService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { IRootState, ICourseData, ICourseState, TAction } from 'types';

export interface IUploadCoursePayload {
  courseId: string
}

export const uploadCourse = createAction<'saga', IUploadCoursePayload>(
  '***saga*** upload Course',
  function* execute(action: TAction<IUploadCoursePayload>) {
    try {
      const { courseId } = action.payload;
      const courseState: ICourseState = yield select((state: IRootState) => state.course);
      const localData = courseState.data;

      if (!localData) {
        throw new Error(`Failed to upload: local data not found`);
      }

      if (courseId !== localData.id) {
        const logData = {
          wantedCourseId: courseId,
          currentCourseId: localData.id,
        };
        throw new Error(`Failed to upload: ids are diff ${JSON.stringify(logData, undefined, 2)}`);
      }

      const remoteData: ICourseData = yield dataService.course.set(courseId, localData);

      // tslint:disable-next-line
      console.log('saved data: ', remoteData);

      const state: ICourseState = {
        courseId,
        source: 'remote',
        data: remoteData,
      };

      yield put(updateState({ stateName: 'course', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Failed to upload course: ${action.payload.courseId}`);
    }
  }
);
