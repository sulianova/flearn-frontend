import * as images from 'assets/images';
import { IArticleContent } from './article';
import { TText } from './course';

export interface IHomeworkData {
  id: string
  text?: TText | TText[],
  reference?: TText | TText[]
  images?: Array<{ imageSrc: keyof typeof images, imageAlt: string }>
  user: {
    id: string
    displayName: string
  }
  review?: IArticleContent
}
