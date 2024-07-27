import type {
  IArticleContent,
  IArticleContentDB,
  IArticleGalleryBlock,
  IArticleGalleryBlockDB,
  IArticleImageBlock,
  IArticleImageBlockDB,
  IArticleQuizBlock,
  IArticleQuizBlockDB,
} from 'types';

import { removeImageSrc } from '../shared';

export function articleFR2DB(contentDB: IArticleContent): IArticleContentDB {
  return contentDB
    .map(c => {
      switch(c.type) {
        case 'image':
          return articleImageBlockFR2DB(c);
        case 'gallery':
          return articleGalleryBlockFR2DB(c);
        case 'quiz':
          return articleQuizBlockFR2DB(c);
        default:
          return c;
      }
    });
}

function articleImageBlockFR2DB(blockDB: IArticleImageBlock): IArticleImageBlockDB {
  return {
    ...blockDB,
    imageData: removeImageSrc(blockDB.imageData),
  };
}

function articleGalleryBlockFR2DB(blockFR: IArticleGalleryBlock): IArticleGalleryBlockDB {
  return {
    ...blockFR,
    images: blockFR.images.map(removeImageSrc),
  };
}

function articleQuizBlockFR2DB(blockFR: IArticleQuizBlock): IArticleQuizBlockDB {
  return {
    ...blockFR,
    steps: blockFR.steps.map(s => !s.image ? s : ({ ...s, image: removeImageSrc(s.image) })),
  };
}
