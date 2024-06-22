import classes from './LandingBtn.module.scss';
import { formatI18nT } from 'shared';
import { EAnalyticsEvent, analyticsService } from 'services/analytics.service';

import Icon from 'ui/Icon/Icon';

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
      <div className={classes.settings}>
        <Icon icon='List'/>
      </div>
    </div>
  );
}