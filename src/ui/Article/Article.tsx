import { Fragment } from 'react';
import { IArticleContent, TArticleHandlers } from 'types';

import Quiz from './Quiz/Quiz';
import Gallery from './Gallery/Gallery';
import Image from './Image/Image';
import Quote from './Quote/Quote';
import Text from './Text/Text';
import List from './List/List';
import TextImportant from './TextImportant/TextImportant';
import Title from './Title/Title';
import Video from './Video/Video';
import Button from './Button/Button';

import './Article.scss';

export default Article;

Article.Quiz = Quiz;
Article.Gallery = Gallery;
Article.Image = Image;
Article.Quote = Quote;
Article.Text = Text;
Article.List = List;
Article.TextImportant = TextImportant;
Article.Title = Title;
Article.Video = Video;
Article.Button = Button;

interface IProps {
  blocks: IArticleContent
  handlers?: TArticleHandlers
}

function Article(props: IProps) {
  return props.blocks.map((block, index) =>
    <Fragment key={index}>
      {renderBlock(block, props.handlers)}
    </Fragment>
  );
}

function renderBlock(block: IArticleContent[number], handlers?: TArticleHandlers) {
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
    case 'quiz':
      return (<Quiz {...block}/>);
    case 'video':
      return (<Video {...block}/>);
    case 'image':
      return (<Image {...block}/>);
    case 'gallery':
      return (<Gallery {...block}/>);
    case 'button':
      return (<Button {...block} handlers={handlers ?? {}}/>)
  }
}
