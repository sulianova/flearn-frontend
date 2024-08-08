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
import Chat from './Chat/Chat';

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
  initiallyUlockedBlocks: number
  onUnlockBlock: (unlockedBlocksCount: number) => void
  onAllBlocksUnlocked: () => void
}

function Article(props: IProps) {
  const { blocks, handlers, initiallyUlockedBlocks, onUnlockBlock, onAllBlocksUnlocked } = props;
  const [lastVisibleLockingBlockIndex, setLastVisibleLockingBlockIndex] = useState(initiallyUlockedBlocks);
  const lockingBlocks = blocks.filter(b => b.type === 'quiz' || b.type === 'chat');
  const lastVisibleLockingBlock = lockingBlocks.at(lastVisibleLockingBlockIndex);
  const lastVisibleBlockIndex =
    !lastVisibleLockingBlock
      ? blocks.length - 1
      : blocks.findIndex(b => b === lastVisibleLockingBlock);
  const visibleBlocks = blocks.slice(0, lastVisibleBlockIndex + 1);

  const lockingBlocksLength = lockingBlocks.length;
  const unlockNextBlock = useCallback(() => {
    const nextIndex = lastVisibleLockingBlockIndex + 1;
    onUnlockBlock(nextIndex);
    setLastVisibleLockingBlockIndex(nextIndex);
    if (nextIndex === lockingBlocksLength) {
      onAllBlocksUnlocked();
    }
  }, [lockingBlocksLength, lastVisibleLockingBlockIndex, onAllBlocksUnlocked]);

  return visibleBlocks.map((block, index) =>
    <Fragment key={index}>
      {renderBlock({
        block,
        handlers,
        unlockNextBlock,
        isInitiallyUlocked: lockingBlocks.findIndex(b => b === block) < initiallyUlockedBlocks,
      })}
    </Fragment>
  );
}

function renderBlock(params: {
  block: IArticleContent[number]
  handlers: TArticleHandlers
  unlockNextBlock: () => void
  isInitiallyUlocked: boolean
}) {
  const { block, handlers, unlockNextBlock, isInitiallyUlocked } = params;
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
      return (<Quiz {...block} onSubmit={unlockNextBlock} isInitialSolvedQuiz={isInitiallyUlocked}/>);
    case 'video':
      return (<Video {...block}/>);
    case 'image':
      return (<Image {...block}/>);
    case 'gallery':
      return (<Gallery {...block}/>);
    case 'button':
      return (<Button {...block} handlers={handlers}/>);
    case 'chat':
      return (<Chat {...block} onSubmit={unlockNextBlock} isInitiallyUlocked={isInitiallyUlocked}/>);
  }
}
