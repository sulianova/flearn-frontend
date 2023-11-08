import { IHomeworkImageData, THomeworkState } from 'types';

export type TAction =
  | {
    type: 'PATCH_STATE'
    payload: Partial<TState>
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
