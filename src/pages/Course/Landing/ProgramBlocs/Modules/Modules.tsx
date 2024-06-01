import classNames from 'classnames/bind';
import { Fragment } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import Text from 'ui/Text/Text';
import Plus from 'assets/images/Svg/Plus';
import SubsectionArrow from 'assets/images/Svg/SubsectionArrow';

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
          <h2 className={cx({ headerTitle: true }) + ' s-text-70'} >{t('title')}</h2>
          <div className={classes.headerDesc + ' s-text-21'}>{<Text text={modulesDescription}/>}</div>
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
    <div className={classes.item} style={{ '--items-in-row': 1 } as React.CSSProperties}>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ itemCard: true }, className)} id={id}>
            <div className={classes.bullet}>2</div>
            <div className={classes.meta + ' s-text-16'}><Text text={props.meta}/></div>
            <div className={classes.title + ' s-text-36'}>
              <Text text={props.title}/>
              <button className={classes.hiddenButton} type="button"></button>
            </div>
            <div className={classes.description + ' s-text-21'}>Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается.</div>
            <ul className={classes.tags}>
              <li className={classes.tag  + ' s-text-16'}>Линия</li>
              <li className={classes.tag  + ' s-text-16'}>Быстрые наброски</li>
              <li className={classes.tag  + ' s-text-16'}>Контраст</li>
              <li className={classes.tag  + ' s-text-16'}>Выделение главного</li>
            </ul>
            <div className={cx({ slideDown: true, slideDownClosed: true })}>
              <div className={classes.additionalInfo}>
                <div className={classes.subsections}>
                  <div className={classes.subsection}>
                    <h3 className={classes.subsectionTitle + ' s-text-28'}>
                      Упражнения, чтобы разрисоваться
                      <button className={classes.hiddenButton} type="button"></button>
                      <div className={cx({ subsectionArrow: true, subsectionArrowOpened: false })}>
                        <SubsectionArrow/>
                      </div>
                    </h3>
                    <div className={cx({ subsectionSlideDown: true, subsectionClosed: false})}>
                      <div className={classes.subsectionDescription + ' s-text-18'}>Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается.</div>
                    </div>
                  </div>
                </div>
                <div className={classes.projects}>
                  <div className={classes.projectsDescription + ' s-text-28'}>Сделаете 5-6 стикеров для Telegram.</div>
                </div>
              </div>
            </div>
            {/* {props.content && Boolean(!Array.isArray(props.content) || props.content.length) && <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>} */}
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}
