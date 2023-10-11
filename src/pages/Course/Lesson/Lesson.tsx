import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch, useGuid } from 'hooks';
import { fetchHomework, fetchLesson, type IFetchHomeworkPayload, type IFetchLessonPayload } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonContent/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonContent/LessonWorks/LessonWorks';
import LessonHeader from './Components/LessonHeader/LessonHeader';

import useLessonFallback from './useLessonFallback';

import type { IHomeworkData, ILessonState, IRootState } from 'types';

export default connect(mapStateToProps)(Lesson);

interface IConnectedProps {
  lessonState: ILessonState
  homework?: IHomeworkData
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    lessonState: state.lesson,
    homework: state.homework?.data,
    authedUserId: state.user?.user?.id,
  };
}

interface IProps extends IConnectedProps {
  practice: 'task' | 'results'
}

function Lesson({ lessonState, practice, homework, authedUserId }: IProps) {
  const { courseId, lessonId } = useParams();
  const [guid, refetch] = useGuid();
  const [selectedUser, setSelectedUser] = useState<{ id: string, displayName: string } | null>(null);

  useEffect(() => {
    refetch();
  }, [authedUserId]);

  useFetch<IFetchLessonPayload  & { guid: string }>({
    actionCreator: fetchLesson,
    payload: {
      courseId: courseId!,
      lessonId: lessonId!,
      guid,
    },
  });

  useFetch<IFetchHomeworkPayload  & { guid: string }>({
    actionCreator: fetchHomework,
    payload: {
      homeworkId: lessonId ? `${lessonId}_some-user-id` : undefined,
      guid,
    },
  });

  const fallback = useLessonFallback(lessonState);
  if (!lessonState.data) {
    return fallback;
  }

  return (
    <Page header wrapper='Lesson'>
      <LessonHeader
        lesson={lessonState.data}
        practice={practice}
        selectedUser={selectedUser}
        handleDisselectUser={() => setSelectedUser(null)}
      />
      {practice === 'task' ?
        (<>
          <LessonContent blocks={lessonState.data.content} data={lessonState.data} homework={homework}/>
          {(lessonState.data.type === 'Practice' && !homework) && (<LessonUppload/>)}
        </>)
      : (<LessonWorks
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          homework={homework}
        />)
      }
    </Page>);
}
