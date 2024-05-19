import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import Text from 'ui/Text/Text';
import Plus from 'assets/images/Svg/Plus';

import classes from './Modules.module.scss';

export default Modules;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

interface IProps extends Pick<ICourseData, 'videosNumber' | 'homeworksNumber' | 'duration'> {
  modules: NonNullable<ICourseData['modules']>
  modulesDescription: NonNullable<ICourseData['modulesDescription']>
}

function Modules(props: IProps) {
  const { modules, modulesDescription, videosNumber, homeworksNumber, duration } = props;
  return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h2 className={cx({ title: true }) + ' s-text-56'} >{t('title')}</h2>
          <div className={classes.desc + ' s-text-21'}>{<Text text={modulesDescription}/>}</div>
          <div className={classes.tags}>
            <div className={classes.tag + ' s-text-18 b-black-new'}>{t('videosNumber.p', { count: videosNumber })}</div>
            <div className={classes.tag + ' s-text-18 b-black-new'}>{t('homeworksNumber.p', { count: homeworksNumber })}</div>
            {/* <div className={classes.tag + ' s-text-18'}>{t(`duration.${duration.unit}.p`, { count: duration.value })}</div> */}
            <div className={classes.tag + ' s-text-18'}>{t('feedback')}</div>
            <div className={classes.tag + ' s-text-18'}>{t('chat')}</div>
          </div>
        </div>
        <div className={classes.list}>
          {modules.map((d, index) => (
            <Fragment key={index}>{renderItem(d)}</Fragment>
          ))}
        </div>
      </div>
  );
}

function renderItem(props: NonNullable<ICourseData['modules']>[number]) {
  const withImage = props.imageId !== undefined;
  if (withImage) {
    return (
      <div className={classes.listItem}>
        <Animated.Scroll>
          {(id, className) => (
            <div className={cx({ listItemCard: true }, className)} id={id}>
              <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
              <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
              <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>
                <div className={classes.listItemLabel}>
                  <span className={classes.listItemLabelIcon}>
                    <Plus/>
                  </span>
                  <span className={classes.listItemLabelText + ' s-text-21'}><Text text={props.imageDesc!}/></span>
                </div>
            </div>
          )}
        </Animated.Scroll>
        <Animated.Scroll>
          {(id, className) => (
            <div className={cx({ listItemCard: true, listItemCardMedia: true }, className)} id={id}>
              <div className={classes.listItemMedia}><Image src={props.imageSrc!} alt={props.imageAlt!}/></div>
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
          <div className={cx({ listItemCardContent: true }, className)} id={id}>
            <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
            <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
            {props.content && Boolean(!Array.isArray(props.content) || props.content.length) && <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>}
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}
