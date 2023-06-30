import classes from './ProgramBlocks.module.scss';
import Description from "./Description/Description";
import Modules from "./Modules/Modules";
import Explain from "./Explain/Explain";

export default function ProgramBlocks() {
  const blocks = [
    <Description/>,
    <Modules/>,
    <Explain/>,
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
