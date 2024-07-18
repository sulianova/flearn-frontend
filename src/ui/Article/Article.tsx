import { Fragment, useCallback, useState } from 'react';
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
  handlers: TArticleHandlers
  initialSolvedQuizes: number
  onLastQuizSubmit: () => void
  onQuizeSubmit: (quizeIndex: number) => void
}

function Article(props: IProps) {
  const { blocks, handlers, initialSolvedQuizes, onQuizeSubmit, onLastQuizSubmit } = props;
  const [visibleQuizIndex, setVisibleQuizIndex] = useState(initialSolvedQuizes); // from 0 - length. If index === length => all quizes are submited
  const quizBlocks = blocks.filter(b => b.type === 'quiz');
  const lastVisibleQuizBlock = quizBlocks.at(visibleQuizIndex);
  const lastVisibleBlockIndex =
    !lastVisibleQuizBlock
      ? blocks.length - 1
      : blocks.findIndex(b => b === lastVisibleQuizBlock);
  const visibleBlocks = blocks.slice(0, lastVisibleBlockIndex + 1);
  const submitQuiz = useCallback(() => {
    onQuizeSubmit(visibleQuizIndex);
    const nextIndex = visibleQuizIndex + 1;
    setVisibleQuizIndex(nextIndex);
    if (nextIndex === quizBlocks.length) {
      onLastQuizSubmit();
    }
  }, [quizBlocks, visibleQuizIndex, onLastQuizSubmit]);

  return visibleBlocks.map((block, index) =>
    <Fragment key={index}>
      {renderBlock({
        block,
        handlers,
        submitQuiz,
        isInitialSolvedQuiz: quizBlocks.findIndex(b => b === block) < initialSolvedQuizes,
      })}
    </Fragment>
  );
}

function renderBlock(params: {
  block: IArticleContent[number]
  handlers: TArticleHandlers
  submitQuiz: () => void
  isInitialSolvedQuiz: boolean
}) {
  const { block, handlers, submitQuiz, isInitialSolvedQuiz } = params;
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
      return (<Quiz {...block} onSubmit={submitQuiz} isInitialSolvedQuiz={isInitialSolvedQuiz}/>);
    case 'video':
      return (<Video {...block}/>);
    case 'image':
      return (<Image {...block}/>);
    case 'gallery':
      return (<Gallery {...block}/>);
    case 'button':
      return (<Button {...block} handlers={handlers}/>)
  }
}
