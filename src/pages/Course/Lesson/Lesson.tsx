import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonContent/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonContent/LessonWorks/LessonWorks';
import LessonHeader from './Components/LessonHeader/LessonHeader';

import { connect } from 'react-redux';

import { useFetch } from 'hooks';
import { fetchCourse, fetchLesson } from 'store/actions/sagas';

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

  useFetch(({ actionCreator: fetchLesson }));

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
