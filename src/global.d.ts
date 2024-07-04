import type { TdHTMLAttributes, HTMLAttributes } from 'react';

declare module '*.html' {
  const content: string;
  export default content;
}

declare module 'react' {
  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    bgcolor?: string
  }
}
