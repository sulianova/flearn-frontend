import {Image3} from 'assets/images';
import classes from './File.module.scss';

import type { TImageDataWState } from '../types';

export default File;

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
    <div>
      <img className={classes.preview} src={imageData.src ?? Image3}/>
      <div className={classes.name + ' s-text-18'}>{imageData.originalName}{stateTxt}</div>
      <button className={classes.remove + ' s-text-14'}>Удалить</button>
    </div>
  );
}
