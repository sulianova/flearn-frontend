import Fallback from 'ui/Fallback';

import { ECommonErrorTypes, type ILessonState } from 'types';
import { i18n } from 'shared';
import { formatDate } from 'utils';
import { IUserData } from 'services/user.service';

interface IProps {
  lessonState: ILessonState
  authedUser: IUserData | null
}

export default function useLessonFallback(props: Readonly<IProps>) {
  const { lessonState, authedUser } = props;

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

  if (authedUser?.role !== 'support' && lessonState.data.startDate > new Date()) {
    const startDate = formatDate(lessonState.data.startDate, { timeZone: 'Europe/Moscow' });
    return <Fallback.Info>{i18n.t('courseLesson.fallback:lessonNotStartedYet', { startDate })}</Fallback.Info>;
  }

  return null;
}
