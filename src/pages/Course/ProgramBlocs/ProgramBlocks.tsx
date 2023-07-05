import classes from './ProgramBlocks.module.scss';
import Description from "./Description/Description";
import Modules from "./Modules/Modules";
import Explain from "./Explain/Explain";
import Teachers from "./Teachers/Teachers";
import Gallery from "./Gallery/Gallery";
import Promo from "./Promo/Promo";
import DecisionForm from "./DecisionForm/DecisionForm";
import FAQ from "./FAQ/FAQ";

export default function ProgramBlocks() {
  const blocks = [
    <Description/>,
    <Modules/>,
    <Promo/>,
    <Teachers/>,
    <Gallery/>,
    <Explain/>,
    <DecisionForm/>,
    <FAQ/>,
  ];

  return (
    <div className={classes._}>
      {renderBlocks(blocks)}
    </div>
  );
}

function renderBlocks(blocks: JSX.Element[]) {
  return blocks.map(block => (<div className={classes.item}>{block}</div>));
}
