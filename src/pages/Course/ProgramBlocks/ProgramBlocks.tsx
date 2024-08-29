import About from './About/About';
import DecisionForm from './DecisionForm/DecisionForm';
import Description from './Description/Description';
import Explain from './Explain/Explain';
import FAQ from './FAQ/FAQ';
import Feedbacks from './Feedbacks/Feedbacks';
import Gallery from './Gallery/Gallery';
import Modules from './Modules/Modules';
import Prizes from './Prizes/Prizes';
import classes from './ProgramBlocks.module.scss';
import Promo from './Promo/Promo';
import StudentResults from './StudentResults/StudentResults';
import StudentsWorks from './StudentsWorks/StudentsWorks';
import Feedback from './Feedback/Feedback';

import type { ICourseData } from 'services/course.service';

interface IProps {
  course: ICourseData
}

export default function ProgramBlocks({ course }: IProps) {
  const {
    about,
    description,
    prizes,
    modules,
    explainMedia,
    promoVideo,
    teacherGallery,
    studentResults,
    studentsWorks,
    faq,
    feedbacks,
  } = course.content;
  const blocks: JSX.Element[] = [
    about && about.length && <About key='about' type={course.type} about={about}/>,
    description && <Description key='description' type={course.type} description={description}/>,
    prizes && prizes.length && <Prizes key='prizes' type={course.type} prizes={prizes}/>,
    modules && <Modules key='modules' modules={modules}/>,
    studentResults && <StudentResults key='studentResults' studentResults={studentResults}/>,
    <Feedback key='feedback'/>,
    studentsWorks && studentsWorks.length && <StudentsWorks key='studentsWorks' studentsWorks={studentsWorks}/>,
    explainMedia && <Explain key='explain' explainMedia={explainMedia}/>,
    teacherGallery && <Gallery key='gallery' teacherGallery={teacherGallery}/>,
    promoVideo && <Promo key='promo' promoVideo={promoVideo}/>,
    feedbacks && feedbacks.length && <Feedbacks key='feedbacks' feedbacks={feedbacks}/>,
    <DecisionForm key='decisionForm' course={course}/>,
    faq && faq.length && <FAQ key='faq' faq={faq}/>,
  ].filter(e => e !== undefined && e !== null && e !== 0);

  return (
    <div className={classes._}>
      {blocks.map((block, index) => (
        <div key={index} className={classes.item}>
          {block}
        </div>
      ))}
    </div>
  );
}
