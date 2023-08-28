import * as images from 'assets/images';
import { TText } from './course';

export interface IArticleBlock {
  factoid?: TText | TText[]
}

export interface IArticleTitleBlock extends IArticleBlock {
  type: 'title'
  title: string
}

/**
 * This is type i sused to ...
 */
export interface IArticleGalleryBlock extends IArticleBlock {
  type: 'gallery'
  images: Array<{ imageSrc: keyof typeof images, imageAlt: string }>
}

export interface IArticleFactoidBlock extends IArticleBlock {
  type: 'factoid'
  factoid: TText | TText[]
}

export interface IArticleTextBlock extends IArticleBlock {
  type: 'text'
  text: TText | TText[]
}

export interface IArticleQouteBlock extends IArticleBlock {
  type: 'qoute'
  qoute: TText | TText[]
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
    caption?: TText | TText[]
  }
}

export interface IArticleImageBlock extends IArticleBlock {
  type: 'image'
  imageData: {
    src: keyof typeof images
    alt: string
    caption?: TText | TText[]
  }
}

export type TArticleBlocks =
  | IArticleFactoidBlock
  | IArticleGalleryBlock
  | IArticleImageBlock
  | IArticleQouteBlock
  | IArticleTextBlock
  | IArticleTextImportantBlock
  | IArticleTitleBlock
  | IArticleVideoBlock;

export type IArticleContent = TArticleBlocks[];
