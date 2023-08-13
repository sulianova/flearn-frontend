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
      const { courseId, lessonId } = action.payload;
      const remoteData: ILessonData | undefined = yield dataService.lesson.get(courseId, lessonId);

      if (!remoteData) {
        throw new Error();
      }

      const jsonData = JSON.stringify(
        {
          lessonData: remoteData,
          lessonMeta: {
            courseId,
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
        courseId,
        lessonId,
        source: 'local',
        hasLocal: true,
        hasRemote: true,
        data: remoteData,
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));
    } catch(e) {
      const fullId = dataService.lesson.getFullId(action.payload.courseId, action.payload.lessonId);
      // tslint:disable-next-line
      console.log(`Faild to download lesson: ${fullId}`);
    }
  }
);
