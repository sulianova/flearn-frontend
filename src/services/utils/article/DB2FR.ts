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

export async function articleDB2FR(contentDB: IArticleContentDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>): Promise<IArticleContent> {
  return Promise.all(
    contentDB.map(c => {
      switch(c.type) {
        case 'image':
          return articleImageBlockDB2FR(c, getImageProps);
        case 'gallery':
          return articleGalleryBlockDB2FR(c, getImageProps);
        case 'quiz':
          return articleQuizeBlockDB2FR(c, getImageProps);
        default:
          return c;
      }
    }
  ));
}

export async function articleImageBlockDB2FR(blockDB: IArticleImageBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>): Promise<IArticleImageBlock> {
  return {
    ...blockDB,
    imageData: await addImageSrc(blockDB.imageData, { ...getImageProps, imageId: blockDB.imageData.id }),
  };
}

export async function articleGalleryBlockDB2FR(blockDB: IArticleGalleryBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>): Promise<IArticleGalleryBlock> {
  return {
    ...blockDB,
    images: await Promise.all(blockDB.images.map(image => addImageSrc(image, { ...getImageProps, imageId: image.id }))),
  };
}

export async function articleQuizeBlockDB2FR(blockDB: IArticleQuizBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>): Promise<IArticleQuizBlock> {
  return {
    ...blockDB,
    steps: await Promise.all(blockDB.steps.map(
      async s => ({ ...s, image: s.image ? await addImageSrc(s.image, { ...getImageProps, imageId: s.image.id }) : undefined })
    )),
  };
}
