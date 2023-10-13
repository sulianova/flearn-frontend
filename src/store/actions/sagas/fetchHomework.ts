
import { call, put } from 'redux-saga/effects';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { TAction } from 'types';

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export interface IFetchHomeworkPayload {
  homeworkId?: string
}

export const fetchHomework = createAction<'saga', IFetchHomeworkPayload>(
  '***saga*** fetch Homework',
  function* execute(action: TAction<IFetchHomeworkPayload>) {
    yield call(delay, 1000);
    const { homeworkId } = action.payload;

    if (!homeworkId) {
      throw Error(`cant homework id ${homeworkId}`);
    }

    const data =  undefined //yield call(getData, homeworkId);

    yield put(updateState({ stateName: 'homework', payload: { data } }));
  }
);

// function getData(homeworkId: string) {
//   return allHomeworks.find(l => l.id === homeworkId);
// }

// const allHomeworks: IHomeworkData[] = [
//   {
//     id: '2_some-user-id',
//     user: {
//       id: 'sonia',
//       displayName: 'Sofiia ulianova',
//     },
//     text: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
//     reference: {
//       tag: 'a',
//       content: 'Это мое описание первого задания на курса.',
//     },
//     images: [
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//     ],
//   },
//   {
//     id: '2_some-user-id',
//     user: {
//       id: 'vova',
//       displayName: 'Vladimir',
//     },
//     text: 'Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса. Это мое описание первого задания на курса.',
//     reference: {
//       tag: 'a',
//       content: 'Это мое описание первого задания на курса.',
//     },
//     images: [
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'TheStrangerVisitingNatureSusl',
//         alt: 'TheStrangerVisitingNatureSusl',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//       {
//         src: 'SummerTime',
//         alt: 'SummerTime',
//       },
//     ],
//   },
// ];
