import classNames from 'classnames/bind';
import classes from './About.module.scss';
import { formatI18nT } from 'shared';

const cx = classNames.bind(classes);
const t = formatI18nT('home.about');

export default function RequestConsultationBanner() {
  return (
    <>
      <div data-bcalternate></div>
      <div className={classes.header}>
        <h2 className={classes.header__title}>{t('title')}</h2>
      </div>
      <div className={classes.tabs}>
          <div className={classes.tabsMenu}>
            <button className={cx({ tab: true, tab_selected: true })}>{t('tabs.tab1.tabTitle')}</button>
            <button className={cx({ tab: true, tab_selected: false })}>{t('tabs.tab2.tabTitle')}</button>
            <button className={cx({ tab: true, tab_selected: false })}>{t('tabs.tab3.tabTitle')}</button>
            <button className={cx({ tab: true, tab_selected: false })}>{t('tabs.tab4.tabTitle')}</button>
            <button className={cx({ tab: true, tab_selected: false })}>{t('tabs.tab5.tabTitle')}</button>
          </div>
          <div className={cx({ card: true})} id="tab1">
            <div className={classes.slideControl}>
              <div className={cx({ item: true, item_active: true })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('tabs.tab1.title')}</div>
              <div className={classes.content__description}>{t('tabs.tab1.description')}</div>
            </div>
          </div>
          <div className={cx({ card: true, card_photo: true})} id="tab2">
          <div className={classes.slideControl}>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: true })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('tabs.tab2.title')}</div>
              <div className={classes.content__description}>{t('tabs.tab2.description')}</div>
            </div>
          </div>
          <div className={cx({ card: true})} id="tab3">
          <div className={classes.slideControl}>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: true })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('tabs.tab3.title')}</div>
              <div className={classes.content__description}>{t('tabs.tab3.description')}</div>
            </div>
          </div>
          <div className={cx({ card: true, card_photo: true})} id="tab4">
          <div className={classes.slideControl}>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: true })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('tabs.tab4.title')}</div>
              <div className={classes.content__description}>{t('tabs.tab4.description')}</div>
            </div>
          </div>
          <div className={cx({ card: true})} id="tab5">
          <div className={classes.slideControl}>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: false })}></div>
              <div className={cx({ item: true, item_active: true })}></div>
            </div>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('tabs.tab5.title')}</div>
              <div className={classes.content__description}>{t('tabs.tab5.description')}</div>
            </div>
          </div>
        </div>
        <div className={classes.list}>
          <div className={classes.item}>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('list.item1.title')}</div>
              <div className={classes.content__description}>{t('list.item1.description')}</div>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.content}>
                <div className={classes.content__title}>{t('list.item2.title')}</div>
                <div className={classes.content__description}>{t('list.item2.description')}</div>
              </div>
          </div>
          <div className={classes.item}>
            <div className={classes.content}>
              <div className={classes.content__title}>{t('list.item3.title')}</div>
              <div className={classes.content__description}>{t('list.item3.description')}</div>
            </div>
          </div>
        </div>
    </>
  );
}