import Page from 'ui/Page/Page';
import LessonHeader from './Components/LessonHeader/LessonHeader';
import LessonContent from './Components/LessonContent/LessonContent';
import LessonUppload from './Components/LessonUppload/LessonUppload';
import LessonWorks from './Components/LessonWorks/LessonWorks';

export default Homework;

function Homework() {
  return (
    <Page header footer wrapper="Lesson">
      <LessonHeader/>
      <LessonContent/>
      <LessonUppload/>
      <LessonWorks/>
    </Page>);
}