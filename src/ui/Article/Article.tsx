import { Fragment } from 'react';
import { IArticleContent } from 'types';

import Factoid from './Factoid/Factoid';
import Gallery from './Gallery/Gallery';
import Image from './Image/Image';
import Qoute from './Qoute/Qoute';
import Text from './Text/Text';
import List from './List/List';
import TextImportant from './TextImportant/TextImportant';
import Title from './Title/Title';
import Video from './Video/Video';

import './Article.scss';

export default Article;

Article.Factoid = Factoid;
Article.Gallery = Gallery;
Article.Image = Image;
Article.Qoute = Qoute;
Article.Text = Text;
Article.List = List;
Article.TextImportant = TextImportant;
Article.Title = Title;
Article.Video = Video;

interface IProps {
  blocks: IArticleContent
}

function Article(props: IProps) {
  return (
    <>
      {renderBlocks(props.blocks)}
    </>
  );
}

function renderBlocks(blocks: IArticleContent) {
  return blocks.map((block, index) => <Fragment key={index}>{renderBlock(block)}</Fragment>);
}

function renderBlock(block: IArticleContent[number]) {
  switch(block.type) {
    case 'title':
      return (<Title data={block}/>);
    case 'text':
      return (<Text data={block}/>);
    case 'list':
      return (<List data={block}/>);
    case 'textImportant':
      return (<TextImportant data={block}/>);
    case 'qoute':
      return (<Qoute data={block}/>);
    case 'factoid':
      return (<Factoid data={block}/>);
    case 'video':
      return (<Video data={block}/>);
    case 'image':
      return (<Image {...block}/>);
    case 'gallery':
      return (<Gallery {...block}/>);
  }
}
