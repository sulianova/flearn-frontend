import { i18n } from 'shared';
import Img from 'ui/Img/Img';
import Sofi from './SofiUlianova25.jpg'

import classes from './Header.module.scss';

export default function Header() {
  return (
    <div className={classes.__}>
      <div className={classes.inner}>
        <div className={classes.headerWrapper}>
          <h1 className={classes.headerTitle}>{i18n.t('catalogue.title')}</h1>
          {/* <div className={classes.descriptionWrapper }>
            <div className={classes.description}>{i18n.t('catalogue.description')}</div>
          </div> */}
        </div>
          <div className={classes.actions}>
              <a
                className={classes.actionsBtn}
                href='#decision-form'
                // onClick={() => analyticsService.logEvent({
                //     type: EAnalyticsEvent.ButtonClicked,
                //     data: {
                //       type: 'scroll_to_decision_form_button_clicked',
                //     },
                //   })
                // }
              >
                <div className={classes.text}>{i18n.t('signUp')}</div>
              </a>
            </div>
      </div>
    </div>
  );
}
