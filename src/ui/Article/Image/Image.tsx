import classnames from 'classnames/bind';
import { useState } from 'react';

import type { IArticleImageBlock } from 'types';

import { useGuid } from 'hooks';
import UIImage from 'ui/Img/Img';
import ImageModal, { type IImage } from 'ui/ImageModal/ImageModal';
import UIText from 'ui/Text/Text';

import classes from './Image.module.scss';

const cx = classnames.bind(classes);

 export default function Image({ imageData, size }: Omit<IArticleImageBlock, 'type'>) {
  const [id] = useGuid();
  const [openedImage, setOpenedImage] = useState<IImage | null>(null);

  return (
    <>
      <div className={cx({ __: true, large: size === 'LARGE' })}>
        <div
          id={id}
          className={classes.image}
          onClick={() => {
            const element = document.querySelector(`#${id}`);
            if (!element) {
              return;
            }
            const rect = element?.getBoundingClientRect();
            setOpenedImage({
              data: imageData,
              originalSize: {
                height: rect.height,
                width: rect.width,
              },
              originalPositioning: {
                top: rect.top,
                left: rect.left,
              },
            });
          }}
        >
          {<UIImage src={imageData.src} alt={imageData.alt} className={cx({ opacityZero: Boolean(openedImage) })}/>}
        </div>
        {imageData.caption && <div className={classes.imageCaption}><UIText text={imageData.caption}/></div>}
      </div>

      {openedImage && (
        <ImageModal
          variant='IMAGE'
          image={openedImage}
          onClose={() => setOpenedImage(null)}
        />
      )}
  </>
  );
}
