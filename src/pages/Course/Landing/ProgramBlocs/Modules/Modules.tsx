import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import classes from './Modules.module.scss';

import { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default Modules;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

interface IProps {
  modules: ICourseData['modules']
  data: ICourseData
}

function Modules(props: IProps) {
  const { duration, durationWeeks } = props.data;

  const durationUnit = duration?.unit ?? 'week';
  const durationValue = duration?.value ?? durationWeeks;

  return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h2 className={cx({ title: true }) + ' s-text-56'} >{t('title')}</h2>
          <div className={classes.desc + ' s-text-24'}>{<Text text={props.data.modulesDescription}/>}</div>
          <div className={classes.tags}>
            <div className={classes.tag + ' s-text-18'}>{t('videosNumber', { count: props.data.videosNumber })}</div>
            <div className={classes.tag + ' s-text-18'}>{t('homeworksNumber', { count: props.data.homeworksNumber })}</div>
            <div className={classes.tag + ' s-text-18'}>{t(`duration:${durationUnit}`, { count: durationValue })}</div>
            <div className={classes.tag + ' s-text-18 b-black-new'}>{t('feedback')}</div>
            <div className={classes.tag + ' s-text-18 b-black-new'}>{t('chat')}</div>
          </div>
        </div>
        <div className={classes.list}>
          {renderItems(props.modules)}
        </div>
      </div>
  );
}

function renderItem(props: ICourseData['modules'][number]) {
  const withImage = props.imageId !== undefined;
  if (withImage) {
    return (
      <div className={classes.listItem}>
        <Animated.Scroll>
          {(id, className) => (
            <div className={cx({ listItemCard: true }, className)} id={id}>
              <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
              <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
              <div className={classes.listItemContent + ' s-text-24'}><Text text={props.content}/></div>
            </div>
          )}
        </Animated.Scroll>
        <Animated.Scroll>
          {(id, className) => (
            <div className={cx({ listItemCard: true }, className)} id={id}>
              <div className={classes.listItemMedia}><Image src={props.imageSrc!} alt={props.imageAlt!}/></div>
              <div className={classes.listItemMediaDesc + ' s-text-18'}><Text text={props.imageDesc!}/></div>
            </div>
          )}
        </Animated.Scroll>
      </div>
    );
  }

  return (
    <div className={classes.listItem} style={{ '--items-in-row': 1 } as React.CSSProperties}>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ listItemCard: true }, className)} id={id}>
            <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
            <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
            <div className={classes.listItemContent + ' s-text-24'}><Text text={props.content}/></div>
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}

function renderItems(props: ICourseData['modules'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
