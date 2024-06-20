import classnames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import Icon from 'ui/Icon/Icon';
import Img from 'ui/Img/Img';
import Text, { type TText } from 'ui/Text/Text';

import classes from './ImageModal.module.scss';

const cx = classnames.bind(classes);

export default ImageModal;

const MODAL_ANIMATION_DURATION = 200;
const GALLERY_IMAGE_MAX_WIDTH_VW = 87;
const GALLERY_IMAGE_MAX_HEIGHT_VH = 93;
const IMAGE_IMAGE_MIN_PADDING_SCALED = 24;

export interface IImage {
  data: {
    src: string
    alt: string
    caption?: TText
  }
  originalSize: {
    height: number
    width: number
  }
  originalPositioning: {
    top: number
    left: number
  }
}

interface IProps {
  image: IImage
  variant: 'IMAGE' | 'GALLERY'
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

function ImageModal({ variant, image, onClose, onNext, onPrev }: Readonly<IProps>) {
  const [state, setState] = useState<null | 'OPENING' | 'OPENED' | 'CLOSING' | 'SWITCHING_FROM' | 'SWITCHING_TO'>(null);

  useEffect(() => {
    setState('OPENING');
    setTimeout(() => setState('OPENED'), MODAL_ANIMATION_DURATION);
  }, []);

  const close = useCallback(() => {
    setState('CLOSING');
    setTimeout(onClose, MODAL_ANIMATION_DURATION);
  }, []);

  const style = useMemo(() => {
    const IMAGE_IMAGE_MIN_PADDING = IMAGE_IMAGE_MIN_PADDING_SCALED * (window.innerWidth / 1600);
    const imageImageMaxHeight = window.innerHeight - 2 * IMAGE_IMAGE_MIN_PADDING;
    const imageImageMaxWidth = window.innerWidth - 2 * IMAGE_IMAGE_MIN_PADDING;
  
    const imageRation = image.originalSize.height / image.originalSize.width;
    const imageBoxMaxHeight = variant === 'IMAGE' ? imageImageMaxHeight : GALLERY_IMAGE_MAX_HEIGHT_VH * window.innerHeight / 100;
    const imageBoxMaxWidth = variant === 'IMAGE' ? imageImageMaxWidth : GALLERY_IMAGE_MAX_WIDTH_VW * window.innerWidth / 100;
    const imageBoxRatio = imageBoxMaxHeight / imageBoxMaxWidth;
    const originalScale = imageRation > imageBoxRatio
      ? image.originalSize.height / imageBoxMaxHeight
      : image.originalSize.width / imageBoxMaxWidth;
    const top2 = variant === 'IMAGE' ?
      (imageRation > imageBoxRatio
        ? IMAGE_IMAGE_MIN_PADDING
        : (window.innerHeight - image.originalSize.height / originalScale) / 2
      ) : (
        imageRation > imageBoxRatio
        ? originalScale * (window.innerHeight - imageBoxMaxHeight) / 2
        : originalScale * (window.innerHeight - image.originalSize.height / originalScale) / 2
      );
    const left2 = variant === 'IMAGE' ?
      (imageRation > imageBoxRatio
        ? (window.innerWidth - image.originalSize.width / originalScale) / 2
        : IMAGE_IMAGE_MIN_PADDING
      ) : (
        imageRation > imageBoxRatio
        ? originalScale * (window.innerWidth - image.originalSize.width / originalScale) / 2
        : originalScale * (window.innerWidth - imageBoxMaxWidth) / 2
      );
    const y = image.originalPositioning.top - top2;
    const x = image.originalPositioning.left - left2;

    return {
      '--image-image-min-padding-scaled': IMAGE_IMAGE_MIN_PADDING_SCALED,
      '--gallery-image-max-height': `${GALLERY_IMAGE_MAX_HEIGHT_VH}vh`,
      '--gallery-image-max-width': `${GALLERY_IMAGE_MAX_WIDTH_VW}vw`,
      '--original-translate-y': `${y}px`,
      '--original-translate-x': `${x}px`,
      '--original-scale': `${originalScale}`,
    } as React.CSSProperties;
  }, []);

  const content = variant === 'IMAGE' ? (
    <>
      {<Img src={image.data.src} alt={image.data.alt} lazy={false}/>}
      {image.data.caption && <div className={classes.modalCaptionWrapper}><div className={classes.modalCaption}><Text text={image.data.caption}/></div></div>}
    </>
  ) : (
      <div className={classes.imageGallery__modalContentWrapper}>
        <div className={classes.imageGallery__modalContent}>
        <div>
          <div className={classes.imageGallery__mainImageWrapper}>
            {onPrev && (
              <div
                className={classes.imageGallery__backwardButton}
                onClick={() => {
                  setState('SWITCHING_FROM');
                  setTimeout(() => {
                    setState('SWITCHING_TO');
                    onPrev();

                    setTimeout(() => {
                      setState('OPENED');
                    }, 250);
                  }, 250);
                }}
              >
                <Icon icon='ArrowButton'/>
              </div>
            )}
              <Img className={cx({ imageGallery__mainImage: true, fade: state === 'SWITCHING_FROM' })} src={image.data.src} alt={image.data.alt}/>
            {onNext && (
              <div
                className={classes.imageGallery__forwardButton}
                onClick={() => {
                  setState('SWITCHING_FROM');
                  setTimeout(() => {
                    setState('SWITCHING_TO');
                    onNext();

                    setTimeout(() => {
                      setState('OPENED');
                    }, 250);
                  }, 250);
                }}
              >
                <Icon icon='ArrowButton'/>
              </div>
            )}
          </div>
            {image.data.caption && <div className={classes.modalCaptionWrapper}><div className={classes.modalCaption}><Text text={image.data.caption}/></div></div>}
          </div>
        </div>
      </div>
  );

  const openCloseAnimation = state != null && state != 'CLOSING';

  return createPortal(
    (
      <div
        data-variant={variant}
        className={cx({ modal: true, modal_Animation: openCloseAnimation })}
        style={style}
      >
        <div className={classes.modalClose} onClick={close}>
          <Icon icon='ModalCross'/>
        </div>
        <div className={classes.modalContentWrapper}>
          <div className={cx({ modalContent: true, modalContent_Animation: openCloseAnimation })}>
            {content}
          </div>
        </div>
      </div>
    ),
  document.body
  );
}
