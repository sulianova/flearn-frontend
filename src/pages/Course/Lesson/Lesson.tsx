import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonContent/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonContent/LessonWorks/LessonWorks';
import LessonHeader from './Components/LessonHeader/LessonHeader';

import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import { fetchLesson, type IFetchLessonPayload } from 'store/actions/sagas';

import type { ILessonData, IRootState } from 'types';

export default connect(mapStateToProps)(Lesson);

interface IConnectedProps {
  data?: ILessonData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
      data: state.lesson?.data,
  };
}

function Lesson({ data }: IConnectedProps) {
  const { courseId, lessonId } = useParams();

  useFetch<IFetchLessonPayload>(({
    actionCreator: fetchLesson,
    payload: {
      courseId: courseId!,
      lessonId: lessonId!,
    },
  }));

  if (!data || Object.keys(data).length === 0) {
    return (
      <Page header footer wrapper='Lesson'>
        <p>loading leasson</p>
      </Page>
    );
  }

  return (
    <Page header footer wrapper='Lesson'>
      <LessonHeader lesson={data}/>
      <LessonContent blocks={data.content}/>
      {data.type === 'Practice' &&
      <>
        <LessonUppload/>
        <LessonWorks/>
      </>}
    </Page>);
}
