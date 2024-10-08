import classNames from 'classnames/bind';

import type { TCourseStudyProcessItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';
import Text from 'ui/Text/Text';

import classes from './StudyProcess.module.scss';

export default StudyProcess;

const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.studyProcess');

interface IProps {
  studyProcess: TCourseStudyProcessItem[]
}

function StudyProcess({ studyProcess }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>{t('headerTitle')}</h2>
      </div>
      <div className={classes.list}>
        {studyProcess.map((d, index) => (
          <div className={classes.item} key={index}>
            <div className={classes.content}>
              {d.caption && <p className={classes.caption}><Text text={d.caption}/></p>}
              <h2 className={classes.title}><Text text={d.title}/></h2>
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
    </div>
  );
}
