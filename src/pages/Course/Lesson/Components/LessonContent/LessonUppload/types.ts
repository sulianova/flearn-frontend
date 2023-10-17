import { IHomeworkImageData, IHomeworkImageDataDB } from 'types';

export type TAction =
  | {
    type: 'CHANGE_INPUT'
    payload: { description: string } | { externalHomeworkLink: string }
  }
  | {
    type: 'START_ADD_IMAGE'
    payload: {
      imageData: IHomeworkImageDataDB
    }
  }
  | {
    type: 'END_DELETE_IMAGE'
    payload: {
      imageId: string
    }
  }
  | {
    type: 'CHANGE_IMAGE'
    payload: {
      imageDataWState: TImageDataWState
    }
  };

export type TState = {
  userId: string
  courseId: string
  lessonId: string
  description: string
  externalHomeworkLink: string
  images: TImageDataWState[]
}

export type TImageDataWState =
  {
    loadingState: { type: 'idle' } | { type: 'success' }
    imageData: IHomeworkImageData
  }
  | {
    loadingState: { type: 'pending' } | { type: 'error', error: string }
    imageData: IHomeworkImageDataDB & { src?: string }
  };

// type TLoadingState =
//   | { type: 'idle' }
//   | { type: 'pending' }
//   | { type: 'success' }
//   | { type: 'error', error: string };
