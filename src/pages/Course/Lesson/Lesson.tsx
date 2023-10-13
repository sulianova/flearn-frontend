import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch, useGuid } from 'hooks';
import { dataService } from 'services';
import { fetchHomeworks, fetchLesson } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonContent/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonContent/LessonWorks/LessonWorks';
import LessonHeader from './Components/LessonHeader/LessonHeader';

import useLessonFallback from './useLessonFallback';

import type { IFetchHomeworksPayload, IFetchLessonPayload } from 'store/actions/sagas';
import type { IHomeworksState, ILessonState, IRootState } from 'types';

export default connect(mapStateToProps)(Lesson);

interface IConnectedProps {
  lessonState: ILessonState
  homeworksState: IHomeworksState
  authedUserId?: string
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    lessonState: state.lesson,
    homeworksState: state.homeworks,
    authedUserId: state.user?.user?.id,
  };
}

interface IProps extends IConnectedProps {
  practice: 'task' | 'results'
}

function Lesson(props: IProps) {
  const { lessonState, practice, homeworksState, authedUserId } = props;

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

  useFetch<IFetchHomeworksPayload  & { guid: string }>({
    actionCreator: fetchHomeworks,
    payload: {
      filter: {
        id: dataService.homework.getFullId(courseId!, lessonId!, authedUserId ?? ''),
        courseId: courseId!,
        lessonId: lessonId!,
      },
      guid,
    },
  });

  const fallback = useLessonFallback(lessonState);
  if (!lessonState.data) {
    return fallback;
  }

  const homework = homeworksState.homeworks?.[0];

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
