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

export interface IArticleFactoidBlock extends IArticleBlock {
  type: 'factoid'
  factoid: TText
}

export interface IArticleTextBlock extends IArticleBlock {
  type: 'text'
  text: TText
}

export interface IArticleListBlock extends IArticleBlock {
  type: 'list'
  text: TText
}

export interface IArticleQouteBlock extends IArticleBlock {
  type: 'qoute'
  qoute: TText
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

export type TArticleBlocks =
  | IArticleFactoidBlock
  | IArticleGalleryBlock
  | IArticleImageBlock
  | IArticleQouteBlock
  | IArticleTextBlock
  | IArticleListBlock
  | IArticleTextImportantBlock
  | IArticleTitleBlock
  | IArticleVideoBlock;

export type TArticleBlocksDB =
  | IArticleFactoidBlock
  | IArticleGalleryBlock
  | IArticleImageBlockDB
  | IArticleQouteBlock
  | IArticleTextBlock
  | IArticleListBlock
  | IArticleTextImportantBlock
  | IArticleTitleBlock
  | IArticleVideoBlock;

export type IArticleContent = TArticleBlocks[];
export type IArticleContentDB = TArticleBlocksDB[];
