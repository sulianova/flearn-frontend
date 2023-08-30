import Fallback from 'ui/Fallback';

import { ELessonErrorTypes, type ILessonState } from 'types';

export default function useLessonFallback(lessonState: ILessonState) {
  if (lessonState.state) {
    if (lessonState.state.type === 'pending') {
      return <Fallback.Pending text='loading lessons...'/>
    }
  
    if (lessonState.state.type === 'error') {
      switch(lessonState.state.errorType) {
        case ELessonErrorTypes.Unauthorized:
          return <Fallback.Unauthorized/>
        case ELessonErrorTypes.Restricted:
          return <Fallback.Restricted/>
        case ELessonErrorTypes.FailedToFindLesson:
          return <Fallback.Error text='404 Failed to find lesson'/>
        case ELessonErrorTypes.LessonDataIsCorrupted:
          return <Fallback.Error text='500 Server error'/>
        case ELessonErrorTypes.Other:
          return <Fallback.Error error={lessonState.state.error}/>
      }
    }
  }

  if (!lessonState.data) {
    return <Fallback.Error/>
  }

  return null;
}
