import { put, select } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonData, ILessonState, IRootState, TAction } from 'types';

export interface IUploadLessonPayload {
  courseId: string
  lessonId: string
}

export const uploadLesson = createAction<'saga', IUploadLessonPayload>(
  '***saga*** upload Lesson',
  function* execute(action: TAction<IUploadLessonPayload>) {
    try {
      const { courseId, lessonId } = action.payload;
      const lessonState: ILessonState = yield select((state: IRootState) => state.lesson);
      const localData = lessonState.data;
      
      if (courseId !== lessonState.courseId || lessonId !== lessonState.lessonId) {
        const logData = {
          wantedCourseId: courseId,
          currentCourseId: lessonState.courseId,
          wantedLessonId: lessonId,
          currentLessonId: lessonState.lessonId,
        };
        throw new Error(`Failed to upload: ids are diff ${JSON.stringify(logData, undefined, 2)}`);
      }

      if (!localData) {
        throw new Error(`Failed to upload: local data not found`);
      }

      const remoteData: ILessonData | undefined = yield dataService.lesson.set(courseId, lessonId, localData);

      // tslint:disable-next-line
      console.log('saved data: ', remoteData);
      if (!remoteData) {
        throw new Error(`Failed to upload: uploaded data not found`);
      }

      const state: ILessonState = {
        courseId,
        lessonId,
        source: 'remote',
        data: remoteData,
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));
    } catch(e) {
      const fullId = dataService.lesson.getFullId(action.payload.courseId, action.payload.lessonId);
      // tslint:disable-next-line
      console.log(`Failed to upload lesson: ${fullId}`);
    }
  }
);
