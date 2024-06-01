import type { IArticleImageBlock } from 'types';
import UIImage from 'ui/Img/Img';
import UIText from 'ui/Text/Text';
import ModalCross from 'assets/images/Svg/ModalCross';

import classes from './Image.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(classes);

export default Image;

interface IProps {
  data: IArticleImageBlock
}

function Image(props: IProps) {
  const { imageData } = props.data;
  return (
    <>
      <div className={classes.__}>
        <div className={classes.image}>
          {<UIImage src={imageData.src} alt={imageData.alt}/>}
        </div>
        {imageData.caption && <div className={classes.imageCaption}><UIText text={imageData.caption}/></div>}
      </div>

      <div className={cx({ modal: true, modalVisible: true})}>
        <div className={classes.modalContentWrapper}>
          <div className={cx({ modalContent: true, modalContent_AnimationEnterDone: true, modalContent_AnimationExitDone: false})}>
            <div className={classes.modalClose}><ModalCross/></div>
            {<UIImage src={imageData.src} alt={imageData.alt}/>}
            {imageData.caption && <div className={classes.modalCaptionWrapper}><div className={classes.modalCaption + ' s-text-14'}><UIText text={imageData.caption}/></div></div>}
          </div>
        </div>
      </div>
  </>
  );
}
