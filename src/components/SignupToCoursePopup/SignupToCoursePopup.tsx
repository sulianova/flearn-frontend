import { useState } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Icon from 'ui/Icon/Icon';
import Popup from 'ui/Popup/Popup';

import Form from './Form/Form';
import classes from './SignupToCoursePopup.module.scss';

const t = formatI18nT('courseLanding.form');

interface IProps {
  course: ICourseData
  option: keyof ICourseData['productOptions']
  close: () => void
}

export default function SignupToCoursePopup(props: Readonly<IProps>) {
  const { course, option, close } = props;
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  return (
    <Popup
      close={close}
      children={startClosingProcess => (
        <div className={classes.__}>
          <div className={classes.close} onClick={startClosingProcess}>
            <Icon icon='Cross'/>
          </div>
          <div className={classes.header}>
            <div className={classes.title}>{t(!orderEmail ? 'subtitle' : !course.isUnderDevelopment ? 'subtitle2' : 'subtitle3', { email: orderEmail })}</div>
            <div className={classes.caption}>{t(!orderEmail ? 'emailCaption' : !course.isUnderDevelopment ? 'emailCaption2' : 'emailCaption3')}</div>
          </div>
            <Form
              course={course}
              option={option}
              onOrderCreated={({ email }) => setOrderEmail(email)}
            />
        </div>
      )}
    />
  );
}
