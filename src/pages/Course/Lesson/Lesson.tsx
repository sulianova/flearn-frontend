import { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import { userService } from 'services/user.service';
import { IFetchLessonPayload, fetchLesson } from 'store/actions/sagas';

import classes from './Lesson.module.scss';
import Page, { EPageVariant } from 'ui/Page/Page';
import LessonContent from './LessonContent/LessonContent';
import LessonUppload from './LessonUppload/LessonUppload';
import LessonWorks from './LessonWorks/LessonWorks';
import LessonHeader from './LessonHeader/LessonHeader';

import useCanShowResults from './useCanShowResults';
import useFetchHomework from './useFetchHomework';
import useHomeworkFallback from './useHomeworkFallback';
import useInitHomework from './useInitHomework';
import useLessonFallback from './useLessonFallback';

import type { ILessonState, IRootState } from 'types';
import MyWork from './MyWork/MyWork';

export default connect(mapStateToProps)(Lesson);

interface IConnectedProps {
  lessonState: ILessonState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    lessonState: state.lesson,
  };
}

interface IProps extends IConnectedProps {
  section: 'task' | 'results' | 'my-work'
}

function Lesson(props: IProps) {
  const { lessonState, section } = props;

  const { courseId, lessonId } = useParams();
  const [scrollToUpload, setScrollToUpload] = useState<boolean>(false);

  const authedUser = userService.useAuthedUser();
  const authedUserId = authedUser?.id;

  useFetch<IFetchLessonPayload>(({
    actionCreator: fetchLesson,
    payload: {
      courseId: courseId!,
      lessonId: lessonId!,
    }
  }));

  useInitHomework({ courseId, lessonId, userId: authedUserId, lesson: lessonState.data });
  const { homework, homeworkState } = useFetchHomework({ courseId, lessonId, userId: authedUserId });

  const fallback = useLessonFallback({ lessonState, authedUser });
  const homeworkFallback = useHomeworkFallback(homeworkState);
  const { canShowResults, fallBack: resultsFallback } = useCanShowResults({ courseId, lessonId, lesson: lessonState.data })

  if (!lessonState.data) {
    return fallback;
  }

  if (lessonState.data.type === 'Practice' && !homework) {
    return homeworkFallback;
  }

  if (section === 'results' && !canShowResults) {
    return resultsFallback;
  }

  if (section === 'my-work' && !homework) {
    return homeworkFallback;
  }

  return (
    <Page variant={EPageVariant.LMS} header footer={false} style={{ backgroundColor: 'var(--color-background-default)'}}>
      <div className={classes.__}>
        <LessonHeader
          lesson={lessonState.data}
          section={section}
        />
        {section === 'task' &&
          (<LessonContent
            courseId={courseId!}
            lessonId={lessonId!}
            blocks={lessonState.data.content}
            data={lessonState.data}
            homework={homework}
            scrollToUpload={() => setScrollToUpload(true)}
            canShowResults={canShowResults}
          />)
        }
        {section === 'task' && homework?.homework?.state === 'DRAFT' &&
          <LessonUppload
            homeworkWPopulate={homework}
            scroll={scrollToUpload}
            onScrollEnd={() => setScrollToUpload(false)}
          />
        }
        {section === 'results' && canShowResults && <LessonWorks/>}
        {section === 'my-work' && <MyWork homework={homework!}/>}
      </div>
    </Page>
  );
}