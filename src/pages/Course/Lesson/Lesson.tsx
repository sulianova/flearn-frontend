import { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import { IFetchLessonPayload, fetchLesson } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import LessonContent from './LessonContent/LessonContent';
import LessonUppload from './LessonUppload/LessonUppload';
import LessonWorks from './LessonWorks/LessonWorks';
import LessonHeader from './LessonHeader/LessonHeader';

import useFetchHomework from './useFetchHomework';
import useHomeworkFallback from './useHomeworkFallback';
import useInitHomework from './useInitHomework';
import useLessonFallback from './useLessonFallback';

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
  section: 'task' | 'results'
}

function Lesson(props: IProps) {
  const { lessonState, section, authedUserId } = props;

  const { courseId, lessonId } = useParams();
  const [scrollToUpload, setScrollToUpload] = useState<boolean>(false);

  useFetch<IFetchLessonPayload>(({
    actionCreator: fetchLesson,
    payload: {
      courseId: courseId!,
      lessonId: lessonId!,
    }
  }));

  useInitHomework({ courseId, lessonId, userId: authedUserId, lesson: lessonState.data });
  const { homework, homeworkState } = useFetchHomework({ courseId, lessonId, userId: authedUserId });

  const fallback = useLessonFallback(lessonState);
  const homeworkFallback = useHomeworkFallback(homeworkState);

  if (!lessonState.data) {
    return fallback;
  }

  if (lessonState.data.type === 'Practice' && !homework) {
    return homeworkFallback;
  }

  return (
    <Page header wrapper='Lesson'>
      <LessonHeader
        lesson={lessonState.data}
        practice={section}
      />
      {section === 'task' &&
        (<LessonContent
          courseId={courseId!}
          lessonId={lessonId!}
          blocks={lessonState.data.content}
          data={lessonState.data}
          homework={homework}
          scrollToUpload={() => setScrollToUpload(true)}
        />)
      }
      {section === 'task' && homework?.homework?.state === 'DRAFT' &&
        <LessonUppload
          homeworkWPopulate={homework}
          scroll={scrollToUpload}
          onScrollEnd={() => setScrollToUpload(false)}
        />
      }
      {section === 'results' && <LessonWorks/>}
    </Page>);
}
