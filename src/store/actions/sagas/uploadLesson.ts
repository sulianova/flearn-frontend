import { put } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonData, ILessonState, TAction } from 'types';

export interface IUploadLessonPayload {
  courseId: string
  lessonId: string
}

export const uploadLesson = createAction<'saga', IUploadLessonPayload>(
  '***saga*** upload Lesson',
  function* execute(action: TAction<IUploadLessonPayload>) {
    try {
      const { courseId, lessonId: lessonPartialId } = action.payload;
      const lessonId = `${courseId}_${lessonPartialId}`;
      let localData: ILessonData | undefined;
      try {
        // @ts-ignore
        const file = yield import(`edit-files/lesson-${lessonId}.json`);
        const isValid = localFilesServise.Lesson.test(file.lessonData);
        if (!isValid) {
          throw new Error('Local file is corrupt');
        }
        localData = localFilesServise.Lesson.localToFR(file.lessonData);
      } catch(e) {
        // tslint:disable-next-line
        console.log(e);
        localData = undefined;
      }

      const hasLocal = localData !== undefined;

      if (!hasLocal) {
        throw new Error();
      }

      const remoteData: ILessonData | undefined = yield dataService.setLesson(lessonId, localData!);

      // tslint:disable-next-line
      console.log('saved data: ', remoteData);
      if (!remoteData) {
        throw new Error();
      }

      const state: ILessonState = {
        lessonId,
        source: 'remote',
        hasLocal,
        hasRemote: true,
        data: remoteData,
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Faild to upload lesson: ${action.payload.courseId}:${action.payload.lessonId}`);
    }
  }
);
