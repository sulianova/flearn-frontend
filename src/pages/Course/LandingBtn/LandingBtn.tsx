import classes from './LandingBtn.module.scss';

import { formatI18nT } from 'shared';
import { EAnalyticsEvent, analyticsService } from 'services/analytics.service';

export default LandingBtn;

function LandingBtn() {

  return (
  <div className={classes.__}>
    <a
      className={classes.btnLink}
      href='#decision-form'
      onClick={() => analyticsService.logEvent({
          type: EAnalyticsEvent.ButtonClicked,
          data: {
            type: 'scroll_to_decision_form_button_clicked',
          },
        })
      }
    >
      начать учиться</a>
  </div>
  );
}