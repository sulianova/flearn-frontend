import type { IArticleButtonBlock, TArticleHandlers } from 'types';

import Text from 'ui/Text/Text';

import classes from './Button.module.scss';

type Props = Omit<IArticleButtonBlock, 'type'> & { handlers: TArticleHandlers };

export default function Button({ content, handlerId, handlers }: Props) {
  const handler = handlers[handlerId];

  if (!handler) {
    return null;
  }

  return (
    <button
      className={classes.__}
      onClick={handler}
    >
      <Text text={content}/>
    </button>
  );
}
