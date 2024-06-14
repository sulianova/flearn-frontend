import type { HTMLAttributes } from 'react';
import type { IProps as ILinkProps } from 'ui/Link/Link';

export type TText = string | TTextNode | Array<string | TTextNode>;

type TTextNode = {
  content: TText | TTextNode[]
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
  } | {
    tag: 'strong'
    props?: HTMLAttributes<HTMLElement>
  }
)
| {
  tag: 'br'
};
