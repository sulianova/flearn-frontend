import Page from 'ui/Page/Page';
import LessonHeader from './Components/LessonHeader/LessonHeader';
import LessonContent from './Components/LessonContent/LessonContent';

export default Lesson;

function Lesson() {
  return (
    <Page header footer wrapper="Lesson">
      <LessonHeader/>
      <LessonContent/>
    </Page>);
}