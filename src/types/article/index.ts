import type { TText } from 'ui/Text/Text';

import type { IChat } from './chat';
import type { TQuizStep } from './quiz';

export type * from './chat';
export type * from './quiz';

export interface IArticleBlock {
  factoid?: TText
}

export interface IArticleTitleBlock extends IArticleBlock {
  type: 'title'
  title: string
}

/**
 * This is type i sused to ...
 */

export interface IArticleTextBlock extends IArticleBlock {
  type: 'text'
  text: TText
}

export interface IArticleListBlock extends IArticleBlock {
  type: 'list'
  items: TText[]
}

export interface IArticleQuoteBlock extends IArticleBlock {
  type: 'quote'
  quote: TText
}

export interface IArticleTextImportantBlock extends IArticleBlock {
  type: 'textImportant'
  text: string
}

export interface IArticleVideoBlock extends IArticleBlock {
  type: 'video'
  videoData: {
    src: string
    title: string
    caption?: TText
  }
}

export interface IArticleImageBlock extends IArticleBlock {
  type: 'image'
  imageData: {
    id: string
    src: string
    alt: string
    caption?: TText
  }
  size?: 'LARGE'
}

export interface IArticleImageBlockDB extends IArticleBlock {
  type: 'image'
  imageData: {
    id: string
    alt: string
    caption?: TText
  }
  size?: 'LARGE'
}

export interface IArticleGalleryBlock extends IArticleBlock {
  type: 'gallery'
  images: Array<{ id: string, src: string, alt: string, caption?: TText }>
  maxHeightPx?: number
}

export interface IArticleGalleryBlockDB extends IArticleBlock {
  type: 'gallery'
  images: Array<{ id: string, alt: string, caption?: TText }>
  maxHeightPx?: number
}

export interface IArticleButtonBlock extends IArticleBlock {
  type: 'button'
  handlerId: string
  content: TText
}

export interface IArticleQuizBlock extends IArticleBlock {
  type: 'quiz'
  steps: TQuizStep[]
}

export interface IArticleChatBlock extends IArticleBlock {
  type: 'chat'
  chat: IChat
}

export type TArticleBlocks =
  | IArticleQuizBlock
  | IArticleGalleryBlock
  | IArticleImageBlock
  | IArticleQuoteBlock
  | IArticleTextBlock
  | IArticleListBlock
  | IArticleTextImportantBlock
  | IArticleTitleBlock
  | IArticleVideoBlock
  | IArticleButtonBlock
  | IArticleChatBlock;

export type TArticleBlocksDB =
  | IArticleQuizBlock
  | IArticleGalleryBlockDB
  | IArticleImageBlockDB
  | IArticleQuoteBlock
  | IArticleTextBlock
  | IArticleListBlock
  | IArticleTextImportantBlock
  | IArticleTitleBlock
  | IArticleVideoBlock
  | IArticleButtonBlock
  | IArticleChatBlock;

export type IArticleContent = TArticleBlocks[];
export type IArticleContentDB = TArticleBlocksDB[];
export type TArticleHandlers = Record<string, (() => void) | undefined>
