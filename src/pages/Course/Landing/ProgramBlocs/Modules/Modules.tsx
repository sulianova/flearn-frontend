import { Fragment } from 'react';
import Image from 'ui/Img/Img';
import classes from './Modules.module.scss';
import { formatI18nT } from 'shared';

import { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default Modules;

const t = formatI18nT('courseLanding.modules');

interface IProps {
  modules: ICourseData['modules']
  data: ICourseData
}

function Modules(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.title + ' s-text-56'}>{t('title')}</h2>
        <div className={classes.desc + ' s-text-24'}>{<Text text={props.data.modulesDescription}/>}</div>
        <div className={classes.tags}>
          <div className={classes.tag + ' s-text-18'}>{props.data.videosNumber} {t('videosNumber')}</div>
          <div className={classes.tag + ' s-text-18'}>{props.data.homeworksNumber} {t('homeworksNumber')}</div>
          <div className={classes.tag + ' s-text-18'}>{props.data.durationWeeks} {t('durationWeeks')}</div>
        </div>
      </div>
      <div className={classes.list}>
        {renderItems(props.modules)}
      </div>
    </div>
  );
}

function renderItem(props: ICourseData['modules'][number]) {
  return (
    <div className={classes.listItem}>
      <div className={classes.listItemCard}>
        <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
        <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
        <div className={classes.listItemContent + ' s-text-24'}><Text text={props.content}/></div>
      </div>
      <div className={classes.listItemCard}>
        <div className={classes.listItemMedia}><Image src={props.imageSrc} alt={props.imageAlt}/></div>
        <div className={classes.listItemMediaDesc + ' s-text-18'}><Text text={props.imageDesc}/></div>
      </div>
    </div>
  );
}

function renderItems(props: ICourseData['modules'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
