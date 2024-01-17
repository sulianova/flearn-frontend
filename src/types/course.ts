import type { HTMLAttributes } from 'react';
import type { IProps as ILinkProps } from 'ui/Link/Link';

export type TText = string | IText;

export type IText = {
  content: TText | IText[]
} & (
  {
    tag: 'p'
    props?: HTMLAttributes<HTMLParagraphElement>
  } | {
    tag: 'span'
    props?: HTMLAttributes<HTMLSpanElement>
  } | {
    tag: 'a'
    props?: ILinkProps
  }
)
| {
  tag: 'br'
};

export interface ICourseInfo {
  startDate: Date
  endDate: Date
  durationWeeks: number
  title: string
}
