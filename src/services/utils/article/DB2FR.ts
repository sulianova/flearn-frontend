import type {
  IArticleContent,
  IArticleContentDB,
  IArticleGalleryBlock,
  IArticleGalleryBlockDB,
  IArticleImageBlock,
  IArticleImageBlockDB,
  IArticleQuizBlock,
  IArticleQuizBlockDB
} from 'types';

import { addImageSrc, type TGetImageUrlProps } from '../shared';

export async function articleDB2FR(contentDB: IArticleContentDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const contentFR: IArticleContent = await Promise.all(
    contentDB.map(c => {
      switch(c.type) {
        case 'image':
          return articleImageBlockDB2FR(c, getImageProps);
        case 'gallery':
          return articleGalleryBlockDB2FR(c, getImageProps);
        default:
          return c;
      }
    }
  ));

  return contentFR;
}

export async function articleImageBlockDB2FR(imageBlockDB: IArticleImageBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const imageBlockFR: IArticleImageBlock = {
    ...imageBlockDB,
    imageData: await addImageSrc(imageBlockDB.imageData, { ...getImageProps, imageId: imageBlockDB.imageData.id }),
  };
  return imageBlockFR;
}

export async function articleGalleryBlockDB2FR(imageBlockDB: IArticleGalleryBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const galleryBlockFR: IArticleGalleryBlock =
  {
    ...imageBlockDB,
    images: await Promise.all(imageBlockDB.images.map(image => addImageSrc(image, { ...getImageProps, imageId: image.id }))),
  };
  return galleryBlockFR;
}

export async function articleQuizeBlockDB2FR(blockDB: IArticleQuizBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const blockFR: IArticleQuizBlock =
  {
    ...blockDB,
    steps: await Promise.all(blockDB.steps.map(s => s.image ? ({ ...s, image: addImageSrc(s.image, { ...getImageProps, imageId: s.image.id })}) : s)),
  };
  return blockFR;
}