import Fallback from 'ui/Fallback';

import { ECommonErrorTypes, THomeworkStateState } from 'types';

export default function useHomeworkFallback(homeworkState: THomeworkStateState) {
  if (homeworkState.type === 'pending') {
    return <Fallback.Pending text='loading homeworks...'/>
  }

  if (homeworkState.type === 'error') {
    switch(homeworkState.errorType) {
      case ECommonErrorTypes.Unauthorized:
        return <Fallback.Unauthorized/>
      case ECommonErrorTypes.Restricted:
        return <Fallback.Restricted/>
      case ECommonErrorTypes.FailedToFindData:
        return <Fallback.Error text='404 Failed to find homework'/>
      case ECommonErrorTypes.DataIsCorrupted:
        return <Fallback.Error text='500 Server error'/>
      case ECommonErrorTypes.Other:
        return <Fallback.Error error={homeworkState.error}/>
    }
  }

  return null;
}
