import { TCourseExplainMedia } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';

import classes from './StudyProcess.module.scss';

export default StudyProcess;

interface IProps {
  explainMedia: TCourseExplainMedia
}

const t = formatI18nT('home.studyProcess');

function StudyProcess() {
  return (
    <>
      <div data-bcalternate></div>
      <div className={classes.header}>
        <h2 className={classes.header__title}>{t('title')}</h2>
      </div>
      <div className={classes.list}>
      <div className={classes.item}>
        <div className={classes.item__image}>
            <Img
              src={{
                mobile: "/png/Home/3d_kukla_lego_angle_mob.png",
                desktop: "/png/Home/3d_kukla_lego_angle_mob.png",
              }}
              alt=""
            />
        </div>
        <div className={classes.item__title}>{t('card1.title')}</div>
        <div className={classes.item__description}>{t('card1.description')}</div>
      </div>
      <div className={classes.item}>
        <div className={classes.item__image}>
              <Img
                src={{
                  mobile: "/png/Home/3d_kukla_Bubble_mob.png",
                  desktop: "/png/Home/3d_kukla_Bubble_mob.png",
                }}
                alt=""
              />
          </div>
        <div className={classes.item__title}>{t('card2.title')}</div>
        <div className={classes.item__description}>{t('card2.description')}</div>
      </div>
      <div className={classes.item}>
        <div className={classes.item__image}>
            <Img
              src={{
                mobile: "/png/Home/3d_hands_8_mob.png",
                desktop: "/png/Home/3d_kukla_Explosion_desk.png",
              }}
              alt=""
            />
        </div>
        <div className={classes.item__title}>{t('card3.title')}</div>
        <div className={classes.item__description}>{t('card3.description')}</div>
      </div>
      </div>
      <div className={classes.group}>
        <div className={classes.column}>
            <div className={classes.card}>{t('quote1')}</div>
            <div className={classes.card}>{t('quote2')}</div>
            <div className={classes.author}>{t('author')}</div>
        </div>
        <div className={classes.imageCard}>
          <Img
            src='png/Home/Sofi.png'
            alt='author'
          />
        </div>
        <div className={classes.author}>{t('author')}</div>
      </div>
    </>
  );
}
