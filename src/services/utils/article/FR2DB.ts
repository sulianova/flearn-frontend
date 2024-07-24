import type {
  IArticleContent,
  IArticleContentDB,
  IArticleGalleryBlock,
  IArticleGalleryBlockDB,
  IArticleImageBlock,
  IArticleImageBlockDB,
} from 'types';

import { removeImageSrc } from '../shared';

export function articleFR2DB(contentDB: IArticleContent) {
  const contentFR: IArticleContentDB = contentDB
    .map(c => {
      switch(c.type) {
        case 'image':
          return articleImageBlockFR2DB(c);
        case 'gallery':
          return articleGalleryBlockFR2DB(c);
        default:
          return c;
      }
    });

  return contentFR;
}

function articleImageBlockFR2DB(imageBlockDB: IArticleImageBlock) {
  const imageBlockFR: IArticleImageBlockDB = {
    ...imageBlockDB,
    imageData: removeImageSrc(imageBlockDB.imageData),
  };
  return imageBlockFR;
}

export function articleGalleryBlockFR2DB(galleryBlockFR: IArticleGalleryBlock) {
  const galleryBlockDB: IArticleGalleryBlockDB =
  {
    ...galleryBlockFR,
    images: galleryBlockFR.images.map(removeImageSrc),
  };
  return galleryBlockDB;
}

