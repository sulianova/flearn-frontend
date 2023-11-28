import Fallback from 'ui/Fallback';

import { ECommonErrorTypes, type ILessonState } from 'types';
import { i18n } from 'shared';
import { formatDate } from 'utils';

export default function useLessonFallback(lessonState: ILessonState) {
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

  if (!lessonState.data) {
    return <Fallback.Error/>;
  }

  if (lessonState.data.startDate > new Date()) {
    const startDate = formatDate(lessonState.data.startDate, { timeZone: 'Europe/Moscow' });
    return <Fallback.Info>{i18n.t('courseLesson.fallback:lessonNotStartedYet', { startDate })}</Fallback.Info>;
  }

  return null;
}
