import { useState } from 'react';
import { userService } from 'services/user.service';

import type { IArticleChatBlock } from 'types';
import Text from 'ui/Text/Text';

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

  return (
    <div>
      <div>
        {visibleBlocks.flatMap(b => b.messages).map((m, index) => (
          <div key={index}>
            {`${m.sender.isSelf ? (authedUser?.displayName ?? 'You') : m.sender.name}: `}
            <Text text={m.content}/>
          </div>
        ))}
      </div>
      {firstHiddenBlock && (
        <button
          onClick={() => {
            const nextIndex = lastVisibleBlockIndex + 1;
            setLastVisibleBlockIndex(nextIndex);
            if (nextIndex + 1 === chat.blocks.length) {
              onSubmit();
            }
          }}
        >
          <Text text={firstHiddenBlock.showThisBlockButtonContent}/>
        </button>
      )}
    </div>
  );
}
