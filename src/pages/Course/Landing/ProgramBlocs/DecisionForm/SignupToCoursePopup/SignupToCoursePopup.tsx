import Popup from 'ui/Popup/Popup';

import Cross from 'assets/images/Svg/Cross';

import classes from './SignupToCoursePopup.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import type { ICourseData } from 'services/course.service';
import { type IUserData } from 'services/user.service';
import { formatI18nT, i18n } from 'shared';

import Link from 'ui/Link/Link';
import Form from '../Form/Form';
import FreeForm from '../FreeForm/FreeForm';


const cx = classNames.bind(classes);
const t = formatI18nT('courseLanding.form');

interface IProps {
  course: ICourseData
  user: IUserData | null
  onClose: () => void
}

export default function SignupToCoursePopup(props: Readonly<IProps>) {
  const { course, user, onClose } = props;
  const { type, duration, creditWas, creditPrice, discontDeadline } = course;
  const [orderEmail, setOrderEmail] = useState<string | null>(null);
  const courseIsFree = Boolean(creditWas === 0 || (creditPrice === 0 && (discontDeadline === null || new Date() < discontDeadline)));

  return (
    <Popup
      children={close => (
        <div className={classes.__}>
          <div className={classes.close} onClick={() => close(onClose)}>
            <Cross/>
          </div>
          <div className={classes.header}>
            <div className={classes.title}>{t(orderEmail ? 'subtitle2' : 'subtitle', { email: orderEmail })}</div>
            <div className={classes.caption}>{t(orderEmail ? 'emailCaption2' : 'emailCaption')}</div>
          </div>
          {user ? (
            <FreeForm userData={user} courseData={course} />
          ) : (
            <Form
              course={course}
              onOrderCreated={({ email }) => setOrderEmail(email)}
            />
          )}
        </div>
      )}
    />
  );
}
