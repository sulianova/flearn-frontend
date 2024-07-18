import type { ButtonHTMLAttributes } from 'react';
import type { TText } from 'ui/Text/Text';

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

export interface IArticleQuizBlock extends IArticleBlock {
  type: 'quiz'
  quiz: TText
}

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
}

export interface IArticleGalleryBlock extends IArticleBlock {
  type: 'gallery'
  images: Array<{ src: string, alt: string, caption?: TText }>
  maxHeightPx?: number
}

export interface IArticleButtonBlock extends IArticleBlock {
  type: 'button'
  handlerId: string
  content: TText
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
  | IArticleButtonBlock;

export type TArticleBlocksDB =
  | IArticleQuizBlock
  | IArticleGalleryBlock
  | IArticleImageBlockDB
  | IArticleQuoteBlock
  | IArticleTextBlock
  | IArticleListBlock
  | IArticleTextImportantBlock
  | IArticleTitleBlock
  | IArticleVideoBlock
  | IArticleButtonBlock;

export type IArticleContent = TArticleBlocks[];
export type IArticleContentDB = TArticleBlocksDB[];
export type TArticleHandlers = Record<string, (() => void) | undefined>
