import { Fragment } from 'react';
import { ILessonContent, TText } from 'types';
import classes from './LessonContent.module.scss';
import LessonFactoid from './LessonFactoid/LessonFactoid';
import LessonImage from './LessonImage/LessonImage';
import LessonQoute from './LessonQoute/LessonQoute';
import LessonText from './LessonText/LessonText';
import LessonTextImportant from './LessonTextImportant/LessonTextImportant';
import LessonTitle from './LessonTitle/LessonTitle';
import LessonVideo from './LessonVideo/LessonVideo';

export default LessonContent;

interface IProps {
  blocks: ILessonContent
}

function LessonContent(props: IProps) {
  return (
    <div className={classes._}>
      {renderBlocks(props.blocks)}
    </div>
  );
}

function renderBlocks(blocks: ILessonContent) {
  return blocks.map((block, index) => <Fragment key={index}>{renderBlock(block)}</Fragment>);
}

function renderBlock(block: ILessonContent[number]) {
  switch(block.type) {
    case 'title':
      return (<LessonTitle data={block}/>);
    case 'text':
      return (<LessonText data={block}/>);
    case 'textImportant':
      return (<LessonTextImportant data={block}/>);
    case 'qoute':
      return (<LessonQoute data={block}/>);
    case 'factoid':
      return (<LessonFactoid data={block}/>);
    case 'video':
      return (<LessonVideo data={block}/>);
    case 'image':
      return (<LessonImage data={block}/>);
  }
}

function Uppload() {
  return (
    <div className={classes.uppload}>
      <div className={classes.upploadDeadline + ' s-text-21-uppercase'}>
        загрузить до воскресенья,
        <br/>
        4 сентября, 23:59 по мск
      </div>
      <a className={classes.upploadBtn + ' s-text-21-uppercase'} href='#upload-form'>Загрузить работу</a>
    </div>
  );
}
