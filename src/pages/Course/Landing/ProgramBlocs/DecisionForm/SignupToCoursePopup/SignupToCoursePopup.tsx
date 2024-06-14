import { useState } from 'react';

import type { ICourseData } from 'services/course.service';
import { type IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';

import Icon from 'ui/Icon/Icon';
import Popup from 'ui/Popup/Popup';

import Form from '../Form/Form';
import FreeForm from '../FreeForm/FreeForm';
import classes from './SignupToCoursePopup.module.scss';

const t = formatI18nT('courseLanding.form');

interface IProps {
  course: ICourseData
  option: keyof ICourseData['productOptions']
  user: IUserData | null
  onClose: () => void
}

export default function SignupToCoursePopup(props: Readonly<IProps>) {
  const { course, option, user, onClose } = props;
  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  return (
    <Popup
      children={close => (
        <div className={classes.__}>
          <div className={classes.close} onClick={() => close(onClose)}>
            <Icon icon='Cross'/>
          </div>
          <div className={classes.header}>
            <div className={classes.title}>{t(orderEmail ? 'subtitle2' : 'subtitle', { email: orderEmail })}</div>
            <div className={classes.caption}>{t(orderEmail ? 'emailCaption2' : 'emailCaption')}</div>
          </div>
          {user ? (
            <FreeForm
              user={user}
              course={course}
              option={option}
            />
          ) : (
            <Form
              course={course}
              option={option}
              onOrderCreated={({ email }) => setOrderEmail(email)}
            />
          )}
        </div>
      )}
    />
  );
}
