import { put } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ICourseData, ICourseState, TAction } from 'types';

export interface IFetchCoursePayload {
  courseId: string
  source?: 'local' | 'remote'
}

export const fetchCourse = createAction<'saga', IFetchCoursePayload>(
  '***saga*** fetch Course',
  function* execute(action: TAction<IFetchCoursePayload>) {
    try {
      const { courseId, source = 'remote' } = action.payload;

      let localData: ICourseData | undefined;
      try {
        // @ts-ignore
        const file = yield import(`edit-files/course-${courseId}.json`);
        const isValid = localFilesServise.Course.test(file.courseData);
        if (!isValid) {
          throw new Error('Local file is corrupt');
        }
        localData = yield localFilesServise.Course.localToFR(file.courseData);
      } catch(e) {
        // tslint:disable-next-line
        console.log(e);
        localData = undefined;
      }
      const hasLocal = localData !== undefined;

      const remoteData: ICourseData | undefined = yield dataService.course.get(courseId);
      const hasRemote = remoteData !== undefined;

      const state: ICourseState = {
        courseId,
        source,
        hasLocal,
        hasRemote,
        data: source === 'remote' ? remoteData : localData,
      };

      console.log({ state });

      yield put(updateState({ stateName: 'course', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Failed to fetch course: ${action.payload.courseId}`);
    }
  }
);
