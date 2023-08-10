import classes from './LessonImage.module.scss';
import Image from 'ui/Img/Img';
import type { ILessonImageBlock } from 'types';
import UIText from 'ui/Text/Text';

export default LessonImage;

interface IProps {
  data: ILessonImageBlock
}

function LessonImage(props: IProps) {
  const { imageData } = props.data;
  return (
      <div className={classes.image}>
        {imageData.src && <Image src={imageData.src} alt={imageData.alt}/>}
        {imageData.caption && <div className={classes.imageCaption}><UIText text={imageData.caption}/></div>}
      </div>
  );
}