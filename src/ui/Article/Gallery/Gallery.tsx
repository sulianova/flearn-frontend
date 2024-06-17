import classnames from 'classnames/bind';
import { useState } from 'react';

import type { IArticleGalleryBlock } from 'types';

import { useGuid } from 'hooks';
import ImageModal, { type IImage } from 'ui/ImageModal/ImageModal';
import Img from 'ui/Img/Img';

import classes from './Gallery.module.scss';

const cx = classnames.bind(classes);

export default Gallery;

interface IProps {
  data: IArticleGalleryBlock['images']
  galleryHeightPx?: number
}

function Gallery(props: IProps) {
  const [id] = useGuid();
  const [openedImage, setOpenedImage] = useState<{ image: IImage, index: number } | null>(null);
  const style = props.galleryHeightPx ?
    { '--gallery-height': props.galleryHeightPx } as React.CSSProperties
    : undefined;

  return (
    <>
      <div className={classes.list} style={style}>
        {props.data.map((image, index) => (
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
            {image.caption && <div className={cx({ itemCaption: true, overlayCaption: true })}>{image.caption}</div>}
          </div>
        ))}
      </div>
      {openedImage && (
        <ImageModal
          variant='GALLERY'
          image={openedImage.image}
          onClose={() => setOpenedImage(null)}
          onNext={() => {
            const nextIndex = openedImage.index + 1 < props.data.length ? openedImage.index + 1 : 0;
            setOpenedImage({
              index: nextIndex,
              image: {
                ...openedImage.image,
                data: props.data[nextIndex],
              },
            });
          }}
          onPrev={() => {
            const prevIndex = openedImage.index - 1 >= 0 ? openedImage.index - 1 : props.data.length - 1;
            setOpenedImage({
              index: prevIndex,
              image: {
                ...openedImage.image,
                data: props.data[prevIndex],
              },
            });
          }}
        />
      )}
    </>
  );
}
