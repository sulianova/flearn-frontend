import { URLSections } from 'router';
import { i18n, formatI18nT } from 'shared';
import { authService } from 'services/auth.service';

import Link from 'ui/Link/Link';

import classes from './Header.module.scss';
import Img from 'ui/Img/Img';

interface IProps {
  onNotAuthedClick: () => void
}

const t = formatI18nT('home.header');

export default function Header(props: IProps) {
  return (
    <div data-header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.tagsBlock}>
          <div className={classes.tag}>{t('tag1')}</div>
          <div className={classes.tag}>{t('tag2')}</div>
        </div>
        <h1 className={classes.title}>{t('title')}</h1>
        <div className={classes.description}>{t('description')}</div>
      </div>
        <div className={classes.actions}>
          {authService.isAuthenticated ? (
            <Link
              className={classes.actions__btn}
              to={URLSections.EmptyProfile.to()}
            >
              {t('button')}
            </Link>
          ) : (
            <div
              className={classes.actions__btn}
              onClick={props.onNotAuthedClick}
            >
              {t('button')}
            </div>
          )}
          <div className={classes.actions__note}>{t('note')}</div>
        </div>
        <Img
          src={{
            mobile: "/png/Home/3d_halloween_glass_angle_bg_mob.png",
            desktop: "/png/Home/3d_halloween_glass_angle_bg_desk.png",
          }}
          alt=""
        />
    </div>
  );
}
