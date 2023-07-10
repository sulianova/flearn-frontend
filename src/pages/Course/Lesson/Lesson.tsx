import Page from 'ui/Page/Page';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonHeader from './Components/LessonHeader/LessonHeader';

export default Lesson;

function Lesson() {
  return (
    <Page header footer wrapper='Lesson'>
      <LessonHeader/>
      <LessonContent/>
    </Page>);
}
