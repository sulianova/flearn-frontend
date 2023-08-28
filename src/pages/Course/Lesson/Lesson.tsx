import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonContent/LessonUppload/LessonUppload';
import LessonWork from './Components/LessonContent/LessonWork/LessonWork';
import LessonWorks from './Components/LessonContent/LessonWorks/LessonWorks';
import LessonHeader from './Components/LessonHeader/LessonHeader';

import { connect } from 'react-redux';

import { useFetch } from 'hooks';
import { fetchCourse, fetchHomework, fetchLesson, type IFetchHomeworkPayload, type IFetchLessonPayload } from 'store/actions/sagas';

import { useState } from 'react';
import { useParams } from 'react-router';
import type { IHomeworkData, ILessonData, IRootState } from 'types';

export default connect(mapStateToProps)(Lesson);

interface IConnectedProps {
  data?: ILessonData
  homework?: IHomeworkData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    data: state.lesson?.data,
    homework: state.homework?.data,
  };
}

interface IProps extends IConnectedProps {
  practice: 'task' | 'results'
}

function Lesson({ data, practice, homework }: IProps) {
  const { lessonId } = useParams();
  const [selectedUser, setSelectedUser] = useState<{ id: string, displayName: string } | null>(null);

  useFetch<IFetchLessonPayload>({
    actionCreator: fetchLesson,
    payload: { lessonId },
  });

  useFetch<IFetchHomeworkPayload>({
    actionCreator: fetchHomework,
    payload: { homeworkId: lessonId ? `${lessonId}_some-user-id` : undefined },
  });

  if (!data || Object.keys(data).length === 0) {
    return (
      <Page header footer wrapper='Lesson'>
        <p>loading leasson</p>
      </Page>
    );
  }

  return (
    <Page header footer wrapper='Lesson'>
      <LessonHeader
        lesson={data}
        practice={practice}
        selectedUser={selectedUser}
        handleDisselectUser={() => setSelectedUser(null)}
      />
      {practice === 'task' ?
        (<>
          <LessonContent blocks={data.content} data={data} homework={homework}/>
          {(data.type === 'Practice' && homework) && (<LessonUppload/>)}
        </>)
      : (<LessonWorks
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          homework={homework}
        />)
      }
    </Page>);
}
