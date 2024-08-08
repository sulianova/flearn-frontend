import classnames from 'classnames/bind';
import { useState } from 'react';

import type { IArticleGalleryBlock } from 'types';

import { useGuid } from 'hooks';
import ImageModal, { type IImage } from 'ui/ImageModal/ImageModal';
import Img from 'ui/Img/Img';
import Text from 'ui/Text/Text';

import classes from './Gallery.module.scss';

const cx = classnames.bind(classes);

export default function Gallery({ images, maxHeightPx }: Omit<IArticleGalleryBlock, 'type'>) {
  const [id] = useGuid();
  const [openedImage, setOpenedImage] = useState<{ image: IImage, index: number } | null>(null);
  const style = maxHeightPx ?
    { '--gallery-max-height': maxHeightPx } as React.CSSProperties
    : undefined;

  return (
    <>
      <div className={classes.list} style={style}>
        {images.map((image, index) => (
          <div
            key={index}
            id={`${id}-${index}`}
            className={classes.item}
            onClick={() => {
              const element = document.querySelector(`#${id}-${index}`);
              if (!element) {
                return;
              }
              const rect = element?.getBoundingClientRect();
              setOpenedImage({
                index,
                image: {
                  data: image,
                  originalSize: {
                    height: rect.height,
                    width: rect.width,
                  },
                  originalPositioning: {
                    top: rect.top,
                    left: rect.left,
                  },
                },
              });
            }}
          >
            <Img src={image.src} alt={image.alt}/>
            <div className={classes.overlay}></div>
            {image.caption && <div className={cx({ itemCaption: true, overlayCaption: true })}><Text text={image.caption}/></div>}
          </div>
        ))}
      </div>
      {openedImage && (
        <ImageModal
          variant='GALLERY'
          image={openedImage.image}
          onClose={() => setOpenedImage(null)}
          onNext={() => {
            const nextIndex = openedImage.index + 1 < images.length ? openedImage.index + 1 : 0;
            setOpenedImage({
              index: nextIndex,
              image: {
                ...openedImage.image,
                data: images[nextIndex],
              },
            });
          }}
          onPrev={() => {
            const prevIndex = openedImage.index - 1 >= 0 ? openedImage.index - 1 : images.length - 1;
            setOpenedImage({
              index: prevIndex,
              image: {
                ...openedImage.image,
                data: images[prevIndex],
              },
            });
          }}
        />
      )}
    </>
  );
}
