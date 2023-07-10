import DecisionForm from './DecisionForm/DecisionForm';
import Description from './Description/Description';
import Explain from './Explain/Explain';
import FAQ from './FAQ/FAQ';
import Gallery from './Gallery/Gallery';
import Modules from './Modules/Modules';
import classes from './ProgramBlocks.module.scss';
import Promo from './Promo/Promo';
import Teachers from './Teachers/Teachers';

export default function ProgramBlocks() {
  const blocks = [
    <Description key='description'/>,
    <Modules key='modules'/>,
    <Promo key='promo'/>,
    <Teachers key='teachers'/>,
    <Gallery key='gallery'/>,
    <Explain key='explain'/>,
    <DecisionForm creditPrice={7000} creditWas={14000} key='decisionForm'/>,
    <FAQ key='faq'/>,
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
