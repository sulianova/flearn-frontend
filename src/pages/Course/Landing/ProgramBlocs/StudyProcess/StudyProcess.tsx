import { formatI18nT } from 'shared';
import classes from './StudyProcess.module.scss';

import type { ICourseData } from 'services/course.service';
import Text from 'ui/Text/Text';
import Img from 'ui/Img/Img';

export default StudyProcess;

const t = formatI18nT('courseLanding.studyProcess');

interface IProps {
  data: ICourseData
}

function StudyProcess(props: IProps) {
  if (!props.data.studyProcess || props.data.studyProcess.length === 0) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</h2>
      </div>
      {props.data.studyProcess.map((d, index) => (
        <div className={classes.item} key={index}>
          <h3 className={classes.title + ' s-text-36'}><Text text={d.title}/></h3>
          <div className={classes.desc + ' s-text-24'}><Text text={d.description}/></div>
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
