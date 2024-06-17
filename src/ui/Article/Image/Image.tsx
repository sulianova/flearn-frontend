import type { IArticleImageBlock } from 'types';
import UIImage from 'ui/Img/Img';
import UIText from 'ui/Text/Text';

import classes from './Image.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ImageModal, { IImage } from 'ui/ImageModal/ImageModal';
import { useGuid } from 'hooks';
const cx = classnames.bind(classes);

export default Image;

interface IProps {
  data: IArticleImageBlock
}

function Image(props: IProps) {
  const { imageData } = props.data;
  const [id] = useGuid();
  const [openedImage, setOpenedImage] = useState<IImage | null>(null);
  // useEffect(() => {
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    //   console.log({ blob });
    // };
    // xhr.open('GET', imageData.src);
    // xhr.send();
    // const path = decodeURI(imageData.src.split('/o/')[1].split('?')[0]).replaceAll('%2F', '/');
    // const urlPromise = firebaseService._getImageURL({ path });
    // // const filePromise = firebaseService.getImage({ path });
    // // console.log({ src: imageData.src, path });

    // urlPromise
    //   .then(url => {
    //     console.log({ path, can1: true, url });
    //     return firebaseService.getImage({ path });
    //   })
    //   .then(file => {
    //     console.log({ path, can2: true, file });
    //   })
    //   .catch(err => {
    //     console.log({ path, err });
    //   })
    // const imageData: await addImageSrc(imageBlockDB.imageData, { courseId, folder: lessonId, imageId: imageBlockDB.imageData.id }),
  // }, [imageData.src]);
  return (
    <>
      <div className={classes.__}>
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

      {/* <div className={cx({ modal: true, modalVisible: true})}>
        <div className={classes.modalContentWrapper}>
          <div className={cx({ modalContent: true, modalContent_Animation: true})}>
            <div className={classes.modalClose}><ModalCross/></div>
            {<UIImage src={imageData.src} alt={imageData.alt}/>}
            {imageData.caption && <div className={classes.modalCaptionWrapper}><div className={classes.modalCaption + ' s-text-14'}><UIText text={imageData.caption}/></div></div>}
          </div>
        </div>
      </div> */}
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
