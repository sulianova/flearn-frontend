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
      const { courseId, lessonId, source = 'remote' } = action.payload;
      let localData: ILessonData | undefined;
      try {
        const fullId = dataService.lesson.getFullId(courseId, lessonId);
        // @ts-ignore
        const file = yield import(`edit-files/lesson-${fullId}.json`);
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

      const remoteData: ILessonData | undefined = yield dataService.lesson.get(courseId, lessonId);
      const hasRemote = remoteData !== undefined;

      const state: ILessonState = {
        courseId,
        lessonId,
        source,
        hasLocal,
        hasRemote,
        data: source === 'remote' ? remoteData : localData,
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));
    } catch(e) {
      const fullId = dataService.lesson.getFullId(action.payload.courseId, action.payload.lessonId);
      // tslint:disable-next-line
      console.log(`Faild to fetch lesson: ${fullId}`);
    }
  }
);
