import { Fragment } from 'react';
import { IArticleContent } from 'types';

import Question from './Question/Question';
import Gallery from './Gallery/Gallery';
import Image from './Image/Image';
import Quote from './Quote/Quote';
import Text from './Text/Text';
import List from './List/List';
import TextImportant from './TextImportant/TextImportant';
import Title from './Title/Title';
import Video from './Video/Video';

import './Article.scss';

export default Article;

Article.Question = Question;
Article.Gallery = Gallery;
Article.Image = Image;
Article.Quote = Quote;
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
      return (<Title {...block}/>);
    case 'text':
      return (<Text {...block}/>);
    case 'list':
      return (<List {...block}/>);
    case 'textImportant':
      return (<TextImportant {...block}/>);
    case 'quote':
      return (<Quote {...block}/>);
    case 'question':
      return (<Question {...block}/>);
    case 'video':
      return (<Video {...block}/>);
    case 'image':
      return (<Image {...block}/>);
    case 'gallery':
      return (<Gallery {...block}/>);
  }
}
