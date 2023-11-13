import Fallback from 'ui/Fallback';

import type { TCourseState } from 'services/course.service';
import { ECommonErrorTypes } from 'types';

interface IProps {
  courseState: TCourseState
}

export default function useFallback(props: Readonly<IProps>) {
  const { courseState } = props;

  if (courseState.type === 'error') {
    switch(courseState.errorType) {
      case ECommonErrorTypes.FailedToFindData:
        return <Fallback.Error text='404 Failed to find courses' fullPage={false}/>
      case ECommonErrorTypes.DataIsCorrupted:
        return <Fallback.Error text='500 Server error' fullPage={false}/>
      case ECommonErrorTypes.Other:
        return <Fallback.Error error={courseState.error} fullPage={false}/>
    }
  }

  if (courseState.type === 'pending') {
    return <Fallback.Pending text='loading courses...' fullPage={false}/>
  }

  return null;
}
