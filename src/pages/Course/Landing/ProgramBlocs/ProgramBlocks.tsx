import About from './About/About';
import DecisionForm from './DecisionForm/DecisionForm';
import Description from './Description/Description';
import Explain from './Explain/Explain';
import FAQ from './FAQ/FAQ';
import Gallery from './Gallery/Gallery';
import Modules from './Modules/Modules';
import Prizes from './Prizes/Prizes';
import classes from './ProgramBlocks.module.scss';
import Promo from './Promo/Promo';
import StudentResults from './StudentResults/StudentResults';
import StudentsWorks from './StudentsWorks/StudentsWorks';

import type { ICourseData } from 'types';

interface IProps {
  data: ICourseData
}

export default function ProgramBlocks(props: IProps) {
  const blocks: JSX.Element[] = [
    <About key='about' {...props}/>,
    <Description key='description' {...props}/>,
    props.data.prizes && <Prizes key='prizes' {...props}/>,
    <Modules key='modules' modules={props.data.modules} {...props}/>,
    props.data.studentResults && <StudentResults key='studentResults' {...props}/>,
    props.data.studentsWorks.length && <StudentsWorks key='studentsWorks' {...props}/>,
    <Explain key='explain' {...props}/>,
    <Gallery key='gallery' {...props}/>,
    props.data.promoVideo && <Promo key='promo' {...props}/>,
    <DecisionForm key='decisionForm' {...props}/>,
    props.data.faq.length && <FAQ key='faq' {...props}/>,
  ].filter(Boolean) as JSX.Element[];

  return (
    <div className={classes._}>
      {renderBlocks(blocks)}
    </div>
  );
}

function renderBlocks(blocks: JSX.Element[]) {
  return blocks.map((block, index) => (<div key={index} className={classes.item}>{block}</div>));
}
