import { put } from 'redux-saga/effects';
import { dataService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ICourseData, ICourseState, TAction } from 'types';

export interface IDownloadCoursePayload {
  courseId: string
}

export const downloadCourse = createAction<'saga', IDownloadCoursePayload>(
  '***saga*** download Course',
  function* execute(action: TAction<IDownloadCoursePayload>) {
    try {
      const { courseId } = action.payload;
      const remoteData: ICourseData | undefined = yield dataService.course.get(courseId);

      if (!remoteData) {
        throw new Error();
      }

      const jsonData = JSON.stringify(
        {
          courseData: remoteData,
          courseMeta: {
            courseId,
          },
        },
        undefined,
        2
      );

      const blob = new Blob([jsonData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.download = `course-${courseId}.json`;
      link.href = url;

      link.click();

      const state: ICourseState = {
        courseId,
        source: 'local',
        hasLocal: true,
        hasRemote: true,
        data: remoteData,
      };

      yield put(updateState({ stateName: 'course', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Faild to download course: ${action.payload.courseId}`);
    }
  }
);
