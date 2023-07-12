import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonHeader from './Components/LessonHeader/LessonHeader';
import LessonUppload from './Components/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonWorks/LessonWorks';

import type { ILessonData } from 'types';

export default Lesson;

const lesson: ILessonData = {
  type: 'Theory',
};

function Lesson() {
  return (
    <Page header footer wrapper='Lesson'>
      <LessonHeader lesson={lesson}/>
      <LessonContent/>
      {lesson.type === 'Practice' &&
      <>
        <LessonUppload/>
        <LessonWorks/>
      </>}
    </Page>);
}
