import * as images from 'assets/images';
import { IArticleContent } from './article';
import { TText } from './course';

export interface IHomeworkData {
  id: string
  text?: TText | TText[],
  reference?: TText | TText[]
  images?: Array<{ src: keyof typeof images, alt: string }>
  user: {
    id: string
    displayName: string
  }
  review?: IArticleContent
}
