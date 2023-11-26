import { i18n } from 'shared';
import { formatDate } from 'utils';

import Fallback from 'ui/Fallback';

import { ECommonErrorTypes, ILessonsData, type ICourseState, type ILessonsState } from 'types';

interface IProps {
  courseState: ICourseState
  lessonsState: ILessonsState
  filteredLessons: ILessonsData[]
}

export default function useFallback(props: Readonly<IProps>) {
  const { courseState, lessonsState, filteredLessons } = props;

  if (courseState.state?.type === 'error') {
    switch(courseState.state.errorType) {
      case ECommonErrorTypes.FailedToFindData:
        return <Fallback.Error text='404 Failed to find course'/>
      case ECommonErrorTypes.DataIsCorrupted:
        return <Fallback.Error text='500 Server error'/>
      case ECommonErrorTypes.Other:
        return <Fallback.Error error={courseState.state.error}/>
    }
  }

  if (lessonsState.state?.type === 'error') {
    switch(lessonsState.state.errorType) {
      case ECommonErrorTypes.Unauthorized:
        return <Fallback.Unauthorized/>
      case ECommonErrorTypes.Restricted:
        return <Fallback.Restricted/>
      case ECommonErrorTypes.FailedToFindData:
        return <Fallback.Error text='404 Failed to find lessons'/>
      case ECommonErrorTypes.DataIsCorrupted:
        return <Fallback.Error text='500 Server error'/>
      case ECommonErrorTypes.Other:
        return <Fallback.Error error={lessonsState.state.error}/>
    }
  }

  if (courseState.state?.type === 'pending' || lessonsState.state?.type === 'pending') {
    return <Fallback.Pending text='loading lessons...'/>
  }

  if (!courseState.data || !lessonsState.lessons) {
    return <Fallback.Error text='500 Server error'/>
  }

  if (!lessonsState.lessons.length) {
    return <Fallback.Error text='It appears this course is under development and has no lessons yet.'/>
  }

  if (lessonsState.lessons.length && !filteredLessons?.length) {
    const minStartDate = lessonsState.lessons.reduce(( minDate, l) => minDate < l.lesson.startDate ? minDate : l.lesson.startDate, lessonsState.lessons[0]?.lesson?.startDate);
    return (
      <Fallback.Info>
        {i18n.t('courseLessons.courseNotStartedYet', { minStartDate: formatDate(minStartDate, { timeZone: 'Europe/Moscow', woTime: true }) })}
      </Fallback.Info>
    );
  }

  return null;
}
