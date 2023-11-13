import DecisionForm from './DecisionForm/DecisionForm';
import Description from './Description/Description';
import Explain from './Explain/Explain';
import FAQ from './FAQ/FAQ';
import Gallery from './Gallery/Gallery';
import Modules from './Modules/Modules';
import classes from './ProgramBlocks.module.scss';
import Promo from './Promo/Promo';
import StudentsWorks from './StudentsWorks/StudentsWorks';

import type { ICourseData } from 'types';

interface IProps {
  data: ICourseData
}

export default function ProgramBlocks(props: IProps) {
  const blocks = [
    <Description key='description' {...props}/>,
    <Promo key='promo' {...props}/>,
    <Modules key='modules' modules={props.data.modules} {...props}/>,
    <StudentsWorks key='studentsWorks' {...props}/>,
    <Explain key='explain' {...props}/>,
    <Gallery key='gallery' {...props}/>,
    <FAQ key='faq' {...props}/>,
    <DecisionForm key='decisionForm' {...props}/>,
  ];

  return (
    <div className={classes._}>
      {renderBlocks(blocks)}
    </div>
  );
}

function renderBlocks(blocks: JSX.Element[]) {
  return blocks.map((block, index) => (<div key={index} className={classes.item}>{block}</div>));
}
