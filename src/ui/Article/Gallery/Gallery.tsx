import classnames from 'classnames/bind';
import { Fragment } from 'react';
import type { IArticleGalleryBlock } from 'types';
import Img from 'ui/Img/Img';
import ModalCross from 'assets/images/Svg/ModalCross';
import ArrowButton from 'assets/images/Svg/ArrowButton';

import classes from './Gallery.module.scss';
const cx = classnames.bind(classes);

export default Gallery;

interface IProps {
  data: IArticleGalleryBlock['images']
  galleryHeightPx?: number
}

function Gallery(props: IProps) {
  const style = props.galleryHeightPx ?
    { '--gallery-height': props.galleryHeightPx } as React.CSSProperties
    : undefined;

  return (
    <>
    <div className={classes.list} style={style}>
      {renderItems(props.data)}
    </div>

    <div className={cx({ modal: true, modalVisible: false})}>
      <div className={classes.modalContentWrapper}>
        <div className={cx({ modalContent: true, modalContent_AnimationEnterDone: true, modalContent_AnimationExitDone: false})}>
          <div className={classes.imageGallery__modalContentWrapper}>
            <div className={classes.imageGallery__modalContent}>
              <div className={classes.modalClose}><ModalCross/></div>
              <div>
              <div className={classes.imageGallery__mainImageWrapper}>
                <div className={classes.imageGallery__backwardButton}>
                  <ArrowButton/>
                </div>
                  <div className={classes.imageGallery__mainImage}>
                    <div className={classes.list} style={style}>
                      {renderItems(props.data)}
                    </div>
                  </div>
                  <div className={classes.imageGallery__forwardButton}>
                    <ArrowButton/>
                  </div>
                </div>
                {<div className={classes.imageGallery__captionWrapper}><div className={classes.imageGallery__caption + ' s-text-14'}>Привет!</div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

function renderItems(props: IArticleGalleryBlock['images']) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}

function renderItem(props: IArticleGalleryBlock['images'][number]) {
  return (
    <div className={classes.item}>
      <Img src={props.src} alt={props.alt}/>
      {/* {props.caption && <div className={cx({ itemCaption: true, overlay: true})}>{props.caption}</div>} */}
      <div className={cx({ itemCaption: true, overlay: true})}>Привет!</div>
    </div>
  );
}
