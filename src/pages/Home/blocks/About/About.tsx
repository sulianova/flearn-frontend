import classNames from 'classnames/bind';
import { useEffect } from 'react';

import { formatI18nT } from 'shared';
import { useIsMobile, useTabSwitcher } from 'hooks';
import Img from 'ui/Img/Img';

import classes from './About.module.scss';

const cx = classNames.bind(classes);
const t = formatI18nT('home.about');

const tabsProps: { card_photo?: boolean }[] = [
  {},
  {card_photo: true},
  {card_photo: true},
];
const D_SLIDE_MS = 5_000;
export default function RequestConsultationBanner() {
  const isMobile = useIsMobile();
  const {tab, setTab, setNextTab, setPrevTab} = useTabSwitcher(tabsProps.length);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const timer = setTimeout(setNextTab, D_SLIDE_MS - 50);
    return () => clearTimeout(timer);
  }, [isMobile, tab, setNextTab]);

  return (
    <>
      <div data-bcalternate></div>
      <div className={classes.header}>
        <h2 className={classes.header__title}>{t('title')}</h2>
      </div>
      <div className={classes.tabs}>
          <div className={classes.tabsMenu}>
            {tabsProps.map((_, index) => (
              <button
                className={cx({ tab: true, tab_selected: index === tab })}
                onClick={() => setTab(index)}
              >
                {t(`tabs.tab${index + 1}.tabTitle`)}
              </button>
            ))}
          </div>
          <div className={cx({ card: true, ...tabsProps[tab]})}>
            <div className={classes.slideButtonsContainer}>
              <button onClick={setPrevTab}/>
              <button onClick={setNextTab}/>
            </div>
            <div className={classes.slideControl}>
              {tabsProps.map((_, index) => (
                <div className={cx({ item: true, item_active: index === tab })}/>
              ))}
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t(`tabs.tab${tab + 1}.title`)}</div>
              <div className={classes.content__description}>{t(`tabs.tab${tab + 1}.description`)}</div>
            </div>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: `/png/Home/about_tab${tab + 1}_mob.png`,
                  desktop: `/png/Home/about_tab${tab + 1}_desk.png`,
                }}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <div className={classes.list}>
          <div className={classes.item}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/Home/3d_kukla_AlarmClock.png",
                  desktop: "/png/Home/3d_kukla_AlarmClock.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('list.item1.title')}</div>
              <div className={classes.content__description}>{t('list.item1.description')}</div>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.image}>
                <Img
                  src={{
                    mobile: "/png/Home/3d_kukla_Settings2.png",
                    desktop: "/png/Home/3d_kukla_Settings2.png",
                  }}
                  alt=""
                />
              </div>
            <div className={classes.content}>
                <div className={classes.content__title}>{t('list.item2.title')}</div>
                <div className={classes.content__description}>{t('list.item2.description')}</div>
              </div>
          </div>
          <div className={classes.item}>
            <div className={classes.image}>
                <Img
                  src={{
                    mobile: "/png/Home/3d_kukla_MoneyboxAngle.png",
                    desktop: "/png/Home/3d_kukla_MoneyboxAngle.png",
                  }}
                  alt=""
                />
              </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('list.item3.title')}</div>
              <div className={classes.content__description}>{t('list.item3.description')}</div>
            </div>
          </div>
        </div> */}
    </>
  );
}