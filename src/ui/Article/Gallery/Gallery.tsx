import { Fragment } from 'react';
import type { IArticleGalleryBlock } from 'types';
import Img from 'ui/Img/Img';
import classes from './Gallery.module.scss';

export default Gallery;

interface IProps {
  data: IArticleGalleryBlock['images']
}

function Gallery(props: IProps) {
  return (
    <div className={classes.list}>
      {renderItems(props.data)}
    </div>
  );
}

function renderItems(props: IArticleGalleryBlock['images']) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}

function renderItem(props: IArticleGalleryBlock['images'][number]) {
  return (
    <div className={classes.item}>
      <Img src={props.src} alt={props.alt}/>
    </div>
  );
}
