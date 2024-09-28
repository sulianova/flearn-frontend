import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { i18n } from 'shared';

import { authService } from 'services/auth.service';
import Link from 'ui/Link/Link';

import { dataService } from 'services/data.service';
import { emailService } from 'services/email.service';
import type { ICourseData} from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'router';
import { getDiscountedPrice, safeObjectKeys, formatCourseCredit, formatCourseDiscount } from 'utils';

import classes from './DecisionForm.module.scss';

import SignupToCoursePopup from '../../../../components/SignupToCoursePopup/SignupToCoursePopup';
import Icon from 'ui/Icon/Icon';
import { lessonService } from 'services/lesson.service';
import { userAccessService } from 'services/userAccess.service';
import { analyticsService } from 'services/analytics.service';

const cx = classNames.bind(classes);

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
}

type TState =
  | { type: 'Idle' }
  | { type: 'Pending' }
  | { type: 'Success' }
  | { type: 'Error', error: string };

const t = formatI18nT('courseLanding.form');

export default function DecisionForm(props: IProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<TState>({ type: 'Idle' });
  const [popupOption, setPopupOption] = useState<keyof ICourseData['productOptions'] | null>(null);
  const user = userService.useAuthedUser();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={classes.header__title}><span className='bc-accent-promo-background'>Бесплатный доступ</span> к первому модулю любого курса без банковской карты и других обязательств</h2>
      </div>
        {authService.isAuthenticated ? (
          <Link
            className={classes.btn}
            to={props.linkToFreeCourse}
          >
            <div className={classes.text}>{i18n.t('signUp')}</div>
          </Link>
        ) : (
          <div
            className={classes.btn}
            onClick={props.onNotAuthedClick}
          >
            <div className={classes.text}>{i18n.t('signUp')}</div>
          </div>
        )}
    </div>
  );
}

async function handleSubmit(props: {
  course: ICourseData
  user: IUserData
  productType: keyof ICourseData['productOptions']
  navigate: (url: string) => void
  setState: (state: TState) => void
}) {
  const { course, user, productType, navigate, setState } = props;
  try {
    setState({ type: 'Pending' });
    await dataService.order.create({
      userFromForm: { email: user.email },
      courseData: course,
      userData: user,
      chosenProductOptionType: productType,
    }).catch(_err => { /* do nothing */ });

    if (course.isUnderDevelopment) {
      await emailService.sendEmail({
        type: emailService.EEmail.WantToBuyDummyCourse,
        course: { isDummy: false, ...course },
        requester: user,
      });
      await emailService.sendEmail({
        type: emailService.EEmail.WelcomeToDummyCourse,
        to: user,
        course: course,
      });
    } else {
      // await userAccessService.add(course.id, user.email, 'FREE');
      await emailService.sendEmail({
        type: emailService.EEmail.WelcomeToCourse,
        to: { email: user.email },
        course,
      });

      const firstLesson = (await lessonService.fetch({ courseId: course.id, topicOrder: 1, orderInTopic: 1 })).at(0);
      if (firstLesson) {
        navigate(URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id }));
      } else {
        navigate(URLSections.Profile.to({ courseId: course.id }));
      }
    }

    setState({ type: 'Success' });
    analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy });
  } catch (error) {
    setState({ type: 'Error', error: String(error) });
    console.log('Failed to handle submit of the decision form', { error, props });
  }
}
