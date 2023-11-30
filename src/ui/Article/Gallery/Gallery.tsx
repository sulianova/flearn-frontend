import { Fragment } from 'react';
import type { IArticleGalleryBlock } from 'types';
import Img from 'ui/Img/Img';
import classes from './Gallery.module.scss';

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
    <div className={classes.list} style={style}>
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
      {props.caption && <div className={classes.itemCaption}>{props.caption}</div>}
    </div>
  );
}
