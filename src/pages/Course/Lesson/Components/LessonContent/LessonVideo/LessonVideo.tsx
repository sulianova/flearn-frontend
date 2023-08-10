import type { ILessonVideoBlock } from 'types';
import Iframe from 'ui/Video/Iframe';
import classes from './LessonVideo.module.scss';
import UIText from 'ui/Text/Text';

import { Fragment } from 'react';

export default LessonVideo;

interface IProps {
  data: ILessonVideoBlock
}

function Video(props: IProps) {
  const { videoData } = props.data;
  return (
    <div className={classes.videoWrapper}>
      <div className={classes.video}>
        <Iframe src={videoData.src} title={videoData.title}/>
        {videoData.caption && <div className={classes.videoCaption}><UIText text={videoData.caption}/></div>}
      </div>
    </div>
  );
}

function LessonVideo(props: IProps) {
  return (
    <Fragment>
      <Video data={props.data}/>
    </Fragment>
  );
}
