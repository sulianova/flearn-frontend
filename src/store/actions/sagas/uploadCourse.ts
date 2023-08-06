import { put } from 'redux-saga/effects';
import { firebaseService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ICourseData, ICourseState, TAction } from 'types';

export interface IUploadCoursePayload {
  courseId: string
}

export const uploadCourse = createAction<'saga', IUploadCoursePayload>(
  '***saga*** upload Course',
  function* execute(action: TAction<IUploadCoursePayload>) {
    try {
      const { courseId } = action.payload;
      let localData: ICourseData | undefined;
      try {
        // @ts-ignore
        const file = yield import(`edit-files/course-${courseId}.json`);
        const isValid = localFilesServise.Course.test(file.courseData);
        if (!isValid) {
          throw new Error('Local file is corrupt');
        }
        localData = localFilesServise.Course.localToFR(file.courseData);
      } catch(e) {
        // tslint:disable-next-line
        console.log(e);
        localData = undefined;
      }

      const hasLocal = localData !== undefined;

      if (!hasLocal) {
        throw new Error();
      }

      const remoteData: ICourseData | undefined = yield firebaseService.setCourse(courseId, localData!);

      // tslint:disable-next-line
      console.log('saved data: ', remoteData);
      if (!remoteData) {
        throw new Error();
      }

      const state: ICourseState = {
        courseId,
        source: 'remote',
        hasLocal,
        hasRemote: true,
        data: remoteData,
      };

      yield put(updateState({ stateName: 'course', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Faild to upload course: ${action.payload.courseId}`);
    }
  }
);
