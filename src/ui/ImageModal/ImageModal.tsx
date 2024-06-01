import classnames from 'classnames/bind';
import { createPortal } from 'react-dom';

import type { TText } from 'types';

import ModalCross from 'assets/images/Svg/ModalCross';
import ArrowButton from 'assets/images/Svg/ArrowButton';
import Img from 'ui/Img/Img';

import classes from './ImageModal.module.scss';
import { useState } from 'react';

const cx = classnames.bind(classes);

export default ImageModal;

// const modalAnimationDuration = 3_000;

interface IProps {
  visible: boolean
  image: {
    src: string
    alt: string
    caption?: TText | TText[]
  }
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

function ImageModal({ visible, image, onClose, onNext, onPrev }: Readonly<IProps>) {
  const [state, setState] = useState<'OPENED' | 'CLOSING'>('OPENED');
  console.log('ImageModal')
  return createPortal(
    (
      <div className={cx({ modal: true, modalVisible: visible })}>
        <div className={classes.modalContentWrapper}>
          <div className={cx({ modalContent: true, modalContent_AnimationEnterDone: state === 'OPENED', modalContent_AnimationExitDone: state === 'OPENED' })}>
            <div className={classes.imageGallery__modalContentWrapper}>
              <div className={classes.imageGallery__modalContent}>
                <div
                  className={classes.modalClose}
                  onClick={() => {
                    setState('CLOSING');
                    onClose();
                  }}
                >
                  <ModalCross/>
                </div>
                <div>
                <div className={classes.imageGallery__mainImageWrapper}>
                  {onPrev && (
                    <div className={classes.imageGallery__backwardButton} onClick={onPrev}>
                      <ArrowButton/>
                    </div>
                  )}
                  <div className={classes.imageGallery__mainImage}>
                    <Img src={image.src} alt={image.alt}/>
                    {/* {props.caption && <div className={cx({ itemCaption: true, overlay: true})}>{image.caption}</div>} */}
                    <div className={cx({ itemCaption: true, overlay: true})}>Привет!</div>
                  </div>
                  {onNext && (
                    <div className={classes.imageGallery__forwardButton} onClick={onNext}>
                      <ArrowButton/>
                    </div>
                  )}
                  </div>
                  {<div className={classes.imageGallery__captionWrapper}><div className={classes.imageGallery__caption + ' s-text-14'}>Привет!</div></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    document.body
  );
}
