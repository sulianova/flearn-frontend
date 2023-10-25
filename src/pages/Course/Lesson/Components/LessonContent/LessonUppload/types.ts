import { IHomeworkImageData, IHomeworkImageDataDB, THomeworkState } from 'types';

export type TAction =
  | {
    type: 'CHANGE_STATE'
    payload: { formState: TLoadingState }
  }
  | {
    type: 'CHANGE_INPUT'
    payload: { description: string } | { externalHomeworkLink: string } | { description: string, externalHomeworkLink: string }
  }
  | {
    type: 'START_ADD_IMAGE'
    payload: {
      imageData: IHomeworkImageData
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
  id: string,
  userId: string
  courseId: string
  lessonId: string
  description: string
  externalHomeworkLink: string
  images: TImageDataWState[]
  homeworkState: THomeworkState
  formState: TLoadingState
}

export type TImageDataWState = {
  loadingState: TLoadingState
  imageData: IHomeworkImageData
};

export type TLoadingState =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'success' }
  | { type: 'error', error: string };
