import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import { fetchLesson, type IFetchLessonPayload } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonContent/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonContent/LessonWorks/LessonWorks';
import LessonHeader from './Components/LessonHeader/LessonHeader';

import useLessonFallback from './useLessonFallback';

import type { ILessonState, IRootState } from 'types';

export default connect(mapStateToProps)(Lesson);

interface IConnectedProps {
  lessonState: ILessonState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    lessonState: state.lesson,
  };
}

function Lesson({ lessonState }: IConnectedProps) {
  const { courseId, lessonId } = useParams();

  useFetch<IFetchLessonPayload>(({
    actionCreator: fetchLesson,
    payload: {
      courseId: courseId!,
      lessonId: lessonId!,
    },
  }));

  const fallback = useLessonFallback(lessonState);
  if (!lessonState.data) {
    return fallback;
  }

  return (
    <Page header footer wrapper='Lesson'>
      <LessonHeader lesson={lessonState.data}/>
      <LessonContent blocks={lessonState.data.content}/>
      {lessonState.data.type === 'Practice' &&
      <>
        <LessonUppload/>
        <LessonWorks/>
      </>}
    </Page>);
}
