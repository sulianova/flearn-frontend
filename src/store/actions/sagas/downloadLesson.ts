import { put } from 'redux-saga/effects';
import { dataService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonData, ILessonState, TAction } from 'types';

export interface IDownloadLessonPayload {
  courseId: string
  lessonId: string
}

export const downloadLesson = createAction<'saga', IDownloadLessonPayload>(
  '***saga*** download Lesson',
  function* execute(action: TAction<IDownloadLessonPayload>) {
    try {
      const { courseId, lessonId: lessonPartialId } = action.payload;
      const lessonId = `${courseId}_${lessonPartialId}`;
      const remoteData: ILessonData | undefined = yield dataService.getLesson(lessonId);

      if (!remoteData) {
        throw new Error();
      }

      const jsonData = JSON.stringify(
        {
          lessonData: remoteData,
          lessonMeta: {
            lessonId,
          },
        },
        undefined,
        2
      );

      const blob = new Blob([jsonData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.download = `lesson-${lessonId}.json`;
      link.href = url;

      link.click();

      const state: ILessonState = {
        lessonId,
        source: 'local',
        hasLocal: true,
        hasRemote: true,
        data: remoteData,
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Faild to download lesson: ${action.payload.courseId}:${action.payload.lessonId}`);
    }
  }
);
