import { Image3 } from 'assets/images';
import classes from './File.module.scss';
import { Fragment } from 'react';
import Trash from 'assets/images/Svg/Trash';

import { formatI18nT } from 'shared';

import type { TImageDataWState, TLoadingState } from '../types';
import Spinner from 'ui/Spinner/Spinner';
import Img from 'ui/Img/Img';

export default File;

const t = formatI18nT('courseLesson.upload');

interface IProps {
  imageDataWState: TImageDataWState
}

function File(props: IProps) {
  const { loadingState, imageData } = props.imageDataWState;

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
      <Img className={classes.preview} src={imageData.src} alt={imageData.alt} />
      <State originalName={imageData.originalName} loadingState={loadingState} />
      <ImageCaption loadingState={loadingState} />
    </Fragment>
  );
}

function State(props: { originalName: string, loadingState: TLoadingState }) {
  if (props.loadingState.type === 'pending') {
    return <Spinner/>;
  }

  if (props.loadingState.type === 'error') {
    return (
      <>
        <div className={classes.error}>
          {props.loadingState.error ? props.loadingState.error : 'Error'}
        </div>
        <div className={classes.originalName}>
          {props.originalName}
        </div>
      </>
    );
  }

  return null;
}

function ImageCaption(props: { loadingState: TLoadingState }) {
  if (props.loadingState.type === 'error') {
    return null;
  }

  return (
    <div className={classes.addCaptionWrapper}>
      <input className={classes.addCaption} type="text" placeholder="Добавить описание"/>
    </div>
  );
}
