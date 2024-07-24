import type { TText } from 'ui/Text/types';

export type TChatSender =
  | {
    isSelf: true
  }
  | {
    isSelf: false
    name: string
  };

export interface IChatMessage {
  sender: TChatSender
  content: TText
}

export interface IChatBlock {
  showThisBlockButtonContent: TText
  messages: IChatMessage[]
}

export interface IChat {
  blocks: IChatBlock[]
}
