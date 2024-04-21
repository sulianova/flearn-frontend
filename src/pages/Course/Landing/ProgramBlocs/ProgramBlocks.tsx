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
import StudyProcess from './StudyProcess/StudyProcess';

import type { ICourseData } from 'services/course.service';

interface IProps {
  course: ICourseData
}

export default function ProgramBlocks({ course }: IProps) {
  const blocks: JSX.Element[] = [
    course.about && <About key='about' about={course.about}/>,
    course.description && <Description key='description' type={course.type} description={course.description}/>,
    course.prizes && course.prizes.length && <Prizes key='prizes' type={course.type} prizes={course.prizes}/>,
    course.modules && course.modulesDescription && (
      <Modules
        key='modules'
        modules={course.modules}
        modulesDescription={course.modulesDescription}
        videosNumber={course.videosNumber}
        homeworksNumber={course.homeworksNumber}
        duration={course.duration}
      />
    ),
    course.studentResults && <StudentResults key='studentResults' studentResults={course.studentResults}/>,
    course.studentsWorks && course.studentsWorks.length && <StudentsWorks key='studentsWorks' studentsWorks={course.studentsWorks}/>,
    course.studyProcess && course.studyProcess.length && <StudyProcess key='studyProcess' studyProcess={course.studyProcess}/>,
    course.explainMedia && <Explain key='explain' explainMedia={course.explainMedia}/>,
    course.teacherGallery && <Gallery key='gallery' teacherGallery={course.teacherGallery}/>,
    course.promoVideo && <Promo key='promo' promoVideo={course.promoVideo}/>,
    course.feedbacks && course.feedbacks.length && <Feedbacks key='feedbacks' feedbacks={course.feedbacks}/>,
    <DecisionForm key='decisionForm' course={course}/>,
    course.faq && course.faq.length && <FAQ key='faq' faq={course.faq}/>,
  ].filter(Boolean) as JSX.Element[];

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
