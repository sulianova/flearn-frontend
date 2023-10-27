import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch, useGuid } from 'hooks';
import { dataService, homeworkService } from 'services';
import { fetchHomeworks, fetchLesson } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import LessonContent from './LessonContent/LessonContent';
import LessonUppload from './LessonUppload/LessonUppload';
import LessonWorks from './LessonWorks/LessonWorks';
import LessonHeader from './LessonHeader/LessonHeader';

import useHomeworkFallback from './useHomeworkFallback';
import useLessonFallback from './useLessonFallback';

import { type IHomeworksState, type ILessonState, type IRootState, type IHomeworkDataWPopulate, type THomeworkStateState, ECommonErrorTypes } from 'types';
import { Subscription } from 'rxjs';

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
  const [selectedUser, setSelectedUser] = useState<{ id: string, displayName: string } | null>(null);
  const [uploadIsVisible, setUploadIsVisible] = useState<boolean>(false);
  const [homework, setHomework] = useState<IHomeworkDataWPopulate | undefined>(undefined);
  const [homeworkState, setHomeworkState] = useState<THomeworkStateState>({ type: 'idle' });

  useEffect(() => {
    if (!courseId || !lessonId || !authedUserId) {
      return;
    }

    setHomeworkState({ type: 'pending' });
    let subscription: Subscription;
    homeworkService.getHomeworkBS({
      filter: { courseId, lessonId, userId: authedUserId },
      populate: { user: true },
    }).then(bs => {
      subscription = bs.subscribe(e => {
        if (e && !(e instanceof Error)) {
          if (e.homeworks.length) {
            setHomework(e.homeworks[0]);
            setHomeworkState({ type: 'idle' });
          }
        }

        if (e instanceof Error) {
          const errorType = homeworkService.errorToType(e);
          setHomeworkState({ type: 'error', error: e, errorType });
        }
      });
    });

    return () => subscription?.unsubscribe();
  }, [courseId, lessonId, authedUserId]);

  useEffect(() => {
    if (homeworkState.type === 'idle') {
      if (!homework || homework.homework.state === 'DRAFT') {
        setUploadIsVisible(true);
      }
    }
  }, [homeworkState])

  const fallback = useLessonFallback(lessonState);
  const homeworkFallback = useHomeworkFallback(homeworkState);
  if (!lessonState.data) {
    return fallback;
  }

  if (!homework) {
    return homeworkFallback;
  }

  return (
    <Page header wrapper='Lesson'>
      <LessonHeader
        lesson={lessonState.data}
        practice={section}
        selectedUser={selectedUser}
        handleDisselectUser={() => setSelectedUser(null)}
      />
      {section === 'task' &&
        (<LessonContent
          courseId={courseId!}
          lessonId={lessonId!}
          blocks={lessonState.data.content}
          data={lessonState.data}
          homework={homework}
          setUploadIsVisible={setUploadIsVisible}
        />)
      }
      {section === 'task' && uploadIsVisible && (!homework || ['DRAFT', 'SENT_FOR_REVIEW'].includes(homework.homework.state)) &&
        <LessonUppload
          homeworkWPopulate={homework}
          setUploadIsVisible={setUploadIsVisible}
        />
      }
      {section === 'results' &&
        (<LessonWorks
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            homework={homework}
          />)
      }
    </Page>);
}
