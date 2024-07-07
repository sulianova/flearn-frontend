import type { IArticleVideoBlock } from 'types';

import UIText from 'ui/Text/Text';
import IFrame from 'ui/Video/Iframe';

import classes from './Video.module.scss';

export default function Video({ videoData }: Omit<IArticleVideoBlock, 'type'>) {
  return (
    <div className={classes.videoWrapper}>
      <div className={classes.video}>
        <IFrame
          src={videoData.src}
          title={videoData.title}
        />
      </div>
      {videoData.caption && (
        <div className={classes.videoCaption}>
          <UIText
            text={videoData.caption}
          />
        </div>
      )}
    </div>
  );
}
