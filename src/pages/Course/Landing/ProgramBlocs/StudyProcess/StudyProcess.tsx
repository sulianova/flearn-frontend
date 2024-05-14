import type { ICourseData } from 'services/course.service';

import Img from 'ui/Img/Img';
import Text from 'ui/Text/Text';

import classes from './StudyProcess.module.scss';

export default StudyProcess;

interface IProps {
  studyProcess: NonNullable<ICourseData['studyProcess']>
}

function StudyProcess({ studyProcess }: IProps) {
  return (
    <div className={classes.wrapper}>
      {studyProcess.map((d, index) => (
        <div className={classes.item} key={index}>
          {/* <p className={classes.factoid}>{index + 1}</p> */}
          <div className={classes.content}>
            {d.caption && <p className={classes.caption + ' s-text-21'}><Text text={d.caption}/></p>}
            <h2 className={classes.title + ' s-text-56'}><Text text={d.title}/></h2>
            <div className={classes.desc + ' s-text-21'}><Text text={d.description}/></div>
          </div>
          {'imageSrc' in d && 'imageAlt' in d && (
            <div className={classes.videoCard}>
              <div className={classes.videoCardContainer}>
                  <Img
                    src={d.imageSrc}
                    alt={d.imageAlt}
                  />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
