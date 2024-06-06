import Popup from 'ui/Popup/Popup';

import ModalCross from 'assets/images/Svg/ModalCross';

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
            <ModalCross/>
          </div>
          <div className={classes.header}>
            <div className={classes.title}>{t('subtitle')}</div>
            <div className={classes.caption + ' s-text-18'}>{t('emailCaption')}</div>
          </div>
          <button className={classes.btn + ' s-text-21'}>Начать учиться</button>
          {user ? (
            <>
              <FreeForm userData={user} courseData={course} />
            </>
          ) : (
            orderEmail ?
              (
                <span>{t(`orderIsCreated.free=${courseIsFree}`, { email: orderEmail })}</span>
              ) : (
              <>
                <Form
                  onOrderCreated={({ email }) => setOrderEmail(email)}
                  courseIsFree={courseIsFree}
                />
              </>
            )
          )}
        </div>
      )}
    />
  );
}
