import { TCourseExplainMedia } from 'services/course.service';
import { formatI18nT } from 'shared';

import Img from 'ui/Img/Img';

import classes from './Community.module.scss';

export default Community;

const t = formatI18nT('home.community');

function Community() {
  return (
    <div className={classes.wrapper}>
      <div data-bcalternate></div>
      <div className={classes.content}>
        <div className={classes.header}>
          <h2 className={classes.header__title}>{t('title')}</h2>
          <div className={classes.header__description}>{t('description')}</div>
        </div>
        <div className={classes.chat}>
          <Img
              src={{
                mobile: "/png/Home/community_chat_mob.png",
                desktop: "/png/Home/community_chat_desk.png",
              }}
              alt=""
            />
        </div>
      </div>
    </div>
  );
}
