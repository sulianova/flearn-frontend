import type { IArticleImageBlock } from 'types';
import UIImage from 'ui/Img/Img';
import UIText from 'ui/Text/Text';
import classes from './Image.module.scss';

export default Image;

interface IProps {
  data: IArticleImageBlock
}

function Image(props: IProps) {
  const { imageData } = props.data;
  return (
      <div className={classes.image}>
        {<UIImage src={imageData.src} alt={imageData.alt}/>}
        {imageData.caption && <div className={classes.imageCaption}><UIText text={imageData.caption}/></div>}
      </div>
  );
}
