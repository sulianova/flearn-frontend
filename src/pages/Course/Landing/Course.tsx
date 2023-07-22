import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import Store from 'store';
import { fetchCourse, saveCourse, type IFetchCoursePayload } from 'store/actions/sagas';

import Page from 'ui/Page/Page';

import ProgramBlocks from './ProgramBlocs/ProgramBlocks';
import ProgramIntro from './ProgramIntro/ProgramIntro';

import type { ICourseData, IRootState } from 'types';

export default connect(mapStateToProps)(Course);

interface IConnectedProps {
  data?: ICourseData
  courseIsStoredLocally?: boolean
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    data: state.course?.data,
    courseIsStoredLocally: state.course?.courseIsStoredLocally,
  };
}

function Course({ data, courseIsStoredLocally }: IConnectedProps) {
  const { courseId } = useParams();

  useFetch<IFetchCoursePayload>(({
    actionCreator: fetchCourse,
    payload: { courseId: courseId! },
  }));

  if (!data) {
    return (
      <Page header footer wrapper='Course'>
        <p>loading course</p>
      </Page>
    );
  }

  return (
    <Page header footer wrapper='Course'>
      <ProgramIntro data={data}/>
      <ProgramBlocks data={data} />
      {courseIsStoredLocally && 
      (<button onClick={() => Store.dispatch(saveCourse({ payload: { courseId: courseId! } }))}>Save course</button>)
      }
    </Page>
  );
}
