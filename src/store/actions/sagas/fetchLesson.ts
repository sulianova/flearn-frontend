import { put } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ILessonData, ILessonState, TAction } from 'types';

export interface IFetchLessonPayload {
  courseId: string
  lessonId: string
  source?: 'local' | 'remote'
}

export const fetchLesson = createAction<'saga', IFetchLessonPayload>(
  '***saga*** fetch Lesson',
  function* execute(action: TAction<IFetchLessonPayload>) {
    try {
      const { courseId, lessonId: lessonPartialId, source = 'remote' } = action.payload;
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

      const remoteData: ILessonData | undefined = yield dataService.getLesson(lessonId);
      const hasRemote = remoteData !== undefined;

      const state: ILessonState = {
        lessonId,
        source,
        hasLocal,
        hasRemote,
        data: source === 'remote' ? remoteData : localData,
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));
    } catch(e) {
      // tslint:disable-next-line
      console.log(`Faild to fetch lesson: ${action.payload.courseId}:${action.payload.lessonId}`);
    }
  }
);
