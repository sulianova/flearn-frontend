import { put, select } from 'redux-saga/effects';

import { dataService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from 'store/actions/redux';

import type { IUserData } from 'services/user.service';
import { ECommonErrorTypes } from 'types';
import type { IHomeworkData, IHomeworksState, IRootState, TAction, IHomeworkDataWPopulate } from 'types';

export interface IFetchHomeworksPayload {
  filter: {
    id?: string
    courseId: string
    lessonId: string
  }
  populate?: {
    user?: boolean
  }
}

export const fetchHomeworks = createAction<'saga', IFetchHomeworksPayload>(
  '***saga*** fetch Homeworks',
  function* execute(action: TAction<IFetchHomeworksPayload>) {
    const { filter, populate } = action.payload;

    try {
      const prevState: IHomeworksState = yield select((state: IRootState): IHomeworksState => state.homeworks);
      const pendingState: IHomeworksState = { ...prevState, state: { type: 'pending' } };
      yield put(updateState({ stateName: 'homeworks', payload: pendingState }));

      // fetch homeworks
      const homeworksData: IHomeworkData[] = yield dataService.homework.getAll(filter);

      // populate
      let populateMap: Map<string, IHomeworkDataWPopulate['populate']>;
      if (populate) {
        populateMap = new Map();

        let populateUserMap: Map<string, IUserData>;
        if (populate.user) {
          const userIds = [...new Set(homeworksData.map(l => l.userId))];
          const usersData: IUserData[] = yield dataService.user.getAll({ ids: userIds });
          populateUserMap = new Map(usersData.map(c => [c.id, c] as const));
        }
        // add here other populated values

        // fill populate map
        for (const homework of homeworksData) {
          populateMap.set(homework.id, {
            ...populateUserMap! && { user: populateUserMap.get(homework.userId) }
          });
        }
      }
      const homeworks: IHomeworkDataWPopulate[] = homeworksData.map(homework => ({
        homework,
        ...populateMap && { populate: populateMap.get(homework.id) },
      }));
    
      const state: IHomeworksState = { homeworks, state: { type: 'idle' } };

      yield put(updateState({ stateName: 'homeworks', payload: state }));
    } catch (err) {
      const error = err as Error;
      const errorIsUnknown = !([...Object.values(ECommonErrorTypes)] as string[]).includes(error.message);
      const state: IHomeworksState = {
        homeworks: [],
        state: {
          type: 'error',
          error,
          errorType: errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes
        },
      };
  
      yield put(updateState({ stateName: 'homeworks', payload: state }));

      // tslint:disable-next-line
      console.log(`Failed to fetch homeworks`, { action, state });
    }
  }
);
