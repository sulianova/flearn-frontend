import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
  course: ICourseData
}

type TState =
  | { type: 'Idle' }
  |  { type: 'Pending' }
  | { type: 'Error', error: string };

const t = formatI18nT('courseLanding.form');
const optionOrder = {
  OPTIMAL: 1,
  BASE: 2,
  EXTENDED: 3,
};

export default function DecisionForm({ course }: IProps) {
  const { type, productOptions } = course;
  const navigate = useNavigate();
  const [state, setState] = useState<TState>({ type: 'Idle' });
  const [popupOption, setPopupOption] = useState<keyof ICourseData['productOptions'] | null>(null);
  const user = userService.useAuthedUser();

  const optionTypes = safeObjectKeys(productOptions).sort((a, b) => optionOrder[a] - optionOrder[b]);
  const optionsNodes = optionTypes.map(type => {
    const option = productOptions[type]!;
    const { creditPrice, creditWas, discount } = getDiscountedPrice(course.discount, option);
    return (
      <div className={cx({ block: true, blockDetails: type === 'OPTIMAL' })} key={type}>
        {type === 'OPTIMAL' && (
          <div className={classes.buble}>самый популярный</div>
        )}
        <div className={classes.titleWrapper}>
          <h2 className={classes.courseName}>{t(`options.${type}.caption`)}</h2>
          <h1 className={classes.title}>{t(`options.${type}.title`)}</h1>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas}>{formatCourseCredit(creditWas)} &#8381;</s>
          <div className={classes.creditPrice}>
            {formatCourseCredit(creditPrice)} &#8381;
            <span className={classes.discount}>{formatCourseDiscount(discount ?? 0)}</span>
          </div>
        </div>
        <button
          onClick={() => user ? handleSubmit({ course, user, productType: type, navigate, setState }) : setPopupOption(type)}
          className={classes.btn}
        >
          {state.type === 'Idle' && 'начать учиться'}
          {state.type === 'Pending' && <Icon icon='Spinner' />}
          {state.type === 'Error' && state.error}
        </button>
      </div>
    );
  })

  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>Попробуйте любой формат курса бесплатно — выбрать один-единственный можно позже</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          {optionsNodes}
        </div>
      </div>
      {popupOption && (
        <SignupToCoursePopup
          course={course}
          option={popupOption}
          close={() => setPopupOption(null)}
        />
      )}
    </>
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

    await userAccessService.add(course.id, user.email, 'FREE');
    await emailService.sendEmail({
      type: emailService.EEmail.WelcomeToCourse,
      to: { email: user.email },
      course,
    });
    analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy });
    const firstLesson = (await lessonService.fetch({ courseId: course.id, topicOrder: 1, orderInTopic: 1 })).at(0);
    if (firstLesson) {
      navigate(URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id }));
    } else {
      navigate(URLSections.Profile.to({ courseId: course.id }));
    }
  } catch (error) {
    setState({ type: 'Error', error: String(error) });
    console.log('Failed to handle submit of the decision form', { error, props });
  }
}
