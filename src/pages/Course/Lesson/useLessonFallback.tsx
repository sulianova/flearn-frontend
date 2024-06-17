import Fallback from 'ui/Fallback';

import { ECommonErrorTypes } from 'types';
import { IUserData } from 'services/user.service';
import { ILessonData, TLessonState } from 'services/lesson.service';

interface IProps {
  lessonState: { state: TLessonState, lesson: ILessonData | null }
  authedUser: IUserData | null
}

export default function useLessonFallback(props: Readonly<IProps>) {
  const { lessonState } = props;

  if (lessonState.state) {
    if (lessonState.state.type === 'pending') {
      return <Fallback.Pending text='loading lessons...'/>;
    }
  
    if (lessonState.state.type === 'error') {
      switch(lessonState.state.errorType) {
        case ECommonErrorTypes.Unauthorized:
          return <Fallback.Unauthorized/>;
        case ECommonErrorTypes.Restricted:
          return <Fallback.Restricted/>;
        case ECommonErrorTypes.FailedToFindData:
          return <Fallback.Error text='404 Failed to find lesson'/>;
        case ECommonErrorTypes.DataIsCorrupted:
          return <Fallback.Error text='500 Server error'/>;
        case ECommonErrorTypes.Other:
          return <Fallback.Error error={lessonState.state.error}/>;
      }
    }
  }

  if (!lessonState.lesson) {
    return <Fallback.Error/>;
  }

  return null;
}
