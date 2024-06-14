import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { dataService } from 'services/data.service';
import { emailService } from 'services/email.service';
import type { ICourseData} from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';
import { URLSections } from 'router';
import { formatDate, safeObjectKeys } from 'utils';

import classes from './DecisionForm.module.scss';

import SignupToCoursePopup from './SignupToCoursePopup/SignupToCoursePopup';
import Icon from 'ui/Icon/Icon';

const cx = classNames.bind(classes);
interface IProps {
  course: ICourseData
}

type TState =
  | { type: 'Idle' }
  |  { type: 'Pending' }
  | { type: 'Error', error: string };

const t = formatI18nT('courseLanding.form');

export default function DecisionForm({ course }: IProps) {
  const { type, productOptions } = course;
  const navigate = useNavigate();
  const [state, setState] = useState<TState>({ type: 'Idle' });
  const [popupOption, setPopupOption] = useState<keyof ICourseData['productOptions'] | null>(null);
  const user = userService.useAuthedUser();

  const optionTypes = safeObjectKeys(productOptions);
  const optionsNodes = optionTypes.map(type => {
    const option = productOptions[type]!;
    return (
      <div className={cx({ block: true, blockDetails: type === 'OPTIMAL' })}>
        {type === 'OPTIMAL' && (
          <div className={classes.buble}>самый популярный</div>
        )}
        <div className={classes.titleWrapper}>
          <h2 className={classes.courseName}>{t(`options.${type}.caption`)}</h2>
          <h1 className={classes.title}>{t(`options.${type}.title`)}</h1>
        </div>
        <div className={classes.credit}>
          <s className={classes.creditWas}>{formatCredit(option.price)} &#8381;</s>
          <div className={classes.creditPrice}>
            {formatCredit(option.price)} &#8381;
            <span className={classes.discount}>{formatCourseDiscount(0)}</span>
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
          onClose={() => setPopupOption(null)}
        />
      )}
    </>
  );
}

function formatCredit(credit: number) {
  const thousands = String(credit).slice(0, -3);
  const theReast = String(credit).slice(-3);
  return `${thousands} ${theReast}`;
}

function formatCourseDiscount(discontAmount: number) {
  return `-${discontAmount}%`;
}

function formatCourseDate(startDate: Date, endDate: Date) {
  const startDateStr = formatDate(startDate, { timeZone: 'Europe/Moscow' });
  const endDateStr = formatDate(endDate, { timeZone: 'Europe/Moscow' });

  return `${startDateStr} – ${endDateStr}`;
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
    const { id: orderId } = await dataService.order.create({
      userFromForm: { email: user.email },
      courseData: course,
      userData: user,
      chosenProductOptionType: productType,
    });

    await dataService.access.add(course.id, user.email, 'FREE');
    await dataService.userCourseProgress.init(course.id, user.email);
    await emailService.sendEmail({
      type: emailService.EEmail.PaymentMethods,
      to: { email: user.email },
      orderId,
      course,
      chosenProductOption: productType,
    });
    navigate(URLSections.Course.Lessons.to({ courseId: course.id }));
  } catch (error) {
    setState({ type: 'Error', error: String(error) });
    console.log('Failed to handle submit of the decision form', { error, props });
  }
}
