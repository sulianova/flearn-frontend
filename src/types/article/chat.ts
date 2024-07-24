import type { TText } from 'ui/Text/types';

export interface ISender {
  isYou: boolean
  name: string
}

export interface IMessage {
  sender: ISender
  content: TText
}

export interface IMessageBlock {
  showThisBlockButtonContent: TText
  messages: IMessage[]
}

export interface IChat {
  blocks: IMessageBlock
}
