import classNames from 'classnames/bind';
import { useState } from 'react';
import { userService } from 'services/user.service';

import type { IArticleChatBlock } from 'types';
import Text from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './Chat.module.scss';

const cx = classNames.bind(classes);
interface IProps extends Omit<IArticleChatBlock, 'type'> {
  isInitiallyUlocked: boolean
  onSubmit: () => void
}

export default function Chat(props: IProps) {
  const { chat, onSubmit, isInitiallyUlocked } = props;
  const authedUser = userService.useAuthedUser();
  const [lastVisibleBlockIndex, setLastVisibleBlockIndex] = useState(isInitiallyUlocked ? chat.blocks.length : 0); // from 0 to length. Index === length => all blocks are visible
  const visibleBlocks = chat.blocks.slice(0, lastVisibleBlockIndex + 1);
  const firstHiddenBlock = chat.blocks.at(lastVisibleBlockIndex + 1);
  const visibleBlocksMessages = visibleBlocks.flatMap(b => b.messages);

  return (
    <>
      {!firstHiddenBlock && (
        <div className={cx({ btnWrapper: true, contentExpander: true})}>
          <button className={cx({ hiddenButton: true })}/>
        </div>
      )}
      {visibleBlocks.map((b, i) => (
        <div key={i} className={cx({ dialog: true, contentExpander: true})}>
          {b.messages.map((m, j) => (
            <div key={j} className={cx({ messagesStack: true, messagesStack_SideRight: m.sender.isSelf })}>
              <div className={classes.messagesStack_Content}>
                <div className={classes.message}>
                  <div className={classes.bubble}>
                    <div className={classes.messageAuthor}>{`${m.sender.isSelf ? (authedUser?.displayName ?? 'You') : m.sender.name}`}</div>
                    <div className={classes.messageText}><Text text={m.content}/></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* { visibleBlocksMessages.length > 0 && (
        <div className={cx({ dialog: true, contentExpander: true})}>
          {visibleBlocksMessages.map((m, index) => (
            <div key={index} className={cx({ messagesStack: true, messagesStack_SideRight: m.sender.isSelf })}>
              <div className={classes.messagesStack_Content}>
                <div className={classes.message}>
                  <div className={classes.bubble}>
                    <div className={classes.messageAuthor}>{`${m.sender.isSelf ? (authedUser?.displayName ?? 'You') : m.sender.name}`}</div>
                    <div className={classes.messageText}><Text text={m.content}/></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}
      {firstHiddenBlock && (
        <div className={cx({ btnWrapper: true, contentExpander: true})}>
          <button
            className={cx({ button: true})}
            onClick={() => {
              const nextIndex = lastVisibleBlockIndex + 1;
              setLastVisibleBlockIndex(nextIndex);
              if (nextIndex + 1 === chat.blocks.length) {
                onSubmit();
              }
            }}
          >
            <Text text={firstHiddenBlock.showThisBlockButtonContent}/>
            <div className={classes.icon}><Icon icon='Send'/></div>
          </button>
        </div>
      )}
    </>
  );
}
