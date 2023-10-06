import { put } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { ECommonErrorTypes, type ICourseData, type ICourseState, type TAction } from 'types';

export interface IUploadCoursePayload {
  courseId: string
}

export const uploadCourse = createAction<'saga', IUploadCoursePayload>(
  '***saga*** upload Course',
  function* execute(action: TAction<IUploadCoursePayload>) {
    try {
      const { courseId } = action.payload;

      let file: any
      try {
        // @ts-ignore
        file = yield import(`edit-files/course-${courseId}.json`);
      } catch(e) {
        // tslint:disable-next-line
        console.error(ECommonErrorTypes.FailedToFindData, e);
        throw new Error(ECommonErrorTypes.FailedToFindData);
      }

      const isValid = localFilesServise.Course.test(file.courseData);
      if (!isValid) {
        throw new Error(ECommonErrorTypes.DataIsCorrupted);
      }

      const localData = yield localFilesServise.Course.localToFR(file.courseData);
      const remoteData: ICourseData = yield dataService.course.set(courseId, localData!);

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
