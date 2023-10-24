import { Image3 } from 'assets/images';
import classes from './File.module.scss';
import { Fragment } from 'react';
import Trash from 'assets/images/Svg/Trash';

import { formatI18nT } from 'shared';

import type { TImageDataWState } from '../types';

export default File;

const t = formatI18nT('courseLesson.upload');

interface IProps {
  imageDataWState: TImageDataWState
}

function File(props: IProps) {
  const { loadingState, imageData } = props.imageDataWState;
  const stateTxt =
    loadingState.type === 'pending' ? ' - Pending' :
    loadingState.type === 'success' ? ' - Loaded' :
    loadingState.type === 'error' ? ` - ${loadingState.error}` : undefined;

  return (
    <Fragment>
      <div className={classes.deleteBtn}>
        <div className={classes.deleteBtnBackgroundWrapper}>
          <div className={classes.deleteBtnBackground}></div>
        </div>
        <div className={classes.deleteSvgWrapper}>
          <button className={classes.deleteSvg}><Trash/></button>
        </div>
      </div>
      <img className={classes.preview} src={imageData.src ?? Image3}/>
      <div className={classes.addCaptionWrapper}>
        <input className={classes.addCaption} type="text" placeholder="Добавить описание"/>
      </div>
      {/* <div className={classes.name + ' s-text-18'}>{imageData.originalName}{stateTxt}</div> */}
    </Fragment>
  );
}
