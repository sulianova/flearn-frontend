import classnames from 'classnames/bind';
import { Fragment, useState } from 'react';
import type { IArticleGalleryBlock } from 'types';
import Img from 'ui/Img/Img';
import ModalCross from 'assets/images/Svg/ModalCross';
import ArrowButton from 'assets/images/Svg/ArrowButton';

import classes from './Gallery.module.scss';
import ImageModal from 'ui/ImageModal/ImageModal';
const cx = classnames.bind(classes);

export default Gallery;

interface IProps {
  data: IArticleGalleryBlock['images']
  galleryHeightPx?: number
}

function Gallery(props: IProps) {
  const [opened, setOpened] = useState(false);
  const style = props.galleryHeightPx ?
    { '--gallery-height': props.galleryHeightPx } as React.CSSProperties
    : undefined;

  console.log({ opened })

  return (
    <>
    <div className={classes.list} style={style}>
      {props.data.map((image, index) => (
        <div key={index} className={classes.item} onClick={() => setOpened(true)}>
          <Img src={image.src} alt={image.alt}/>
          {/* {props.caption && <div className={cx({ itemCaption: true, overlay: true })}>{props.caption}</div>} */}
          <div className={cx({ itemCaption: true, overlay: true })}>Привет!</div>
        </div>
      ))}
    </div>
    <ImageModal
      visible={opened}
      image={props.data[0]}
      onClose={() => setOpened(false)}
      onNext={() => {}}
    />
  </>
  );
}
