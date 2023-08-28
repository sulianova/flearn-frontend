import type { IArticleVideoBlock } from 'types';
import UIText from 'ui/Text/Text';
import Iframe from 'ui/Video/Iframe';
import classes from './Video.module.scss';

export default Video;

interface IProps {
  data: IArticleVideoBlock
}

function Video(props: IProps) {
  const { videoData } = props.data;
  return (
    <div className={classes.videoWrapper}>
      <div className={classes.video}>
        <Iframe src={videoData.src} title={videoData.title}/>
      </div>
      {videoData.caption && <div className={classes.videoCaption}><UIText text={videoData.caption}/></div>}
    </div>
  );
}
