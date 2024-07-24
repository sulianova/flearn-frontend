import type {
  IArticleContent,
  IArticleContentDB,
  IArticleGalleryBlock,
  IArticleGalleryBlockDB,
  IArticleImageBlock,
  IArticleImageBlockDB,
} from 'types';

import { addImageSrc, type TGetImageUrlProps } from '../shared';

export async function articleDB2FR(contentDB: IArticleContentDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const contentFR: IArticleContent = await Promise.all(
    contentDB.map(c => {
      switch(c.type) {
        case 'image':
          return lessonImageBlockDB2FR(c, getImageProps);
        case 'gallery':
          return lessonGalleryBlockDB2FR(c, getImageProps);
        default:
          return c;
      }
    }
  ));

  return contentFR;
}

export async function lessonImageBlockDB2FR(imageBlockDB: IArticleImageBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const imageBlockFR: IArticleImageBlock = {
    ...imageBlockDB,
    imageData: await addImageSrc(imageBlockDB.imageData, { ...getImageProps, imageId: imageBlockDB.imageData.id }),
  };
  return imageBlockFR;
}

export async function lessonGalleryBlockDB2FR(imageBlockDB: IArticleGalleryBlockDB, getImageProps: Omit<TGetImageUrlProps, 'imageId'>) {
  const galleryBlockFR: IArticleGalleryBlock =
  {
    ...imageBlockDB,
    images: await Promise.all(imageBlockDB.images.map(image => addImageSrc(image, { ...getImageProps, imageId: image.id }))),
  };
  return galleryBlockFR;
}
