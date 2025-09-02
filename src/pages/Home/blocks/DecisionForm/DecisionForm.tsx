import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatI18nT, i18n } from 'shared';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import { authService } from 'services/auth.service';
import { dataService } from 'services/data.service';
import { emailService } from 'services/email.service';
import type { ICourseData} from 'services/course.service';
import { userService, type IUserData } from 'services/user.service';
import { URLSections } from 'router';


import { lessonService } from 'services/lesson.service';
import { TCourseProductOptionTypes } from 'services/course.service';
import { discountService } from 'services/discount.service';
import { analyticsService } from 'services/analytics.service';

import classes from './DecisionForm.module.scss';
import { MONTHLY_ORDER_URL, QUARTERLY_ORDER_URL } from 'utils/order';

const cx = classNames.bind(classes);
const t = formatI18nT('decision');
export const PricingID = 'Pricing';

interface IProps {
  linkToFreeCourse: string
  onNotAuthedClick: () => void
  next: (productOptionType: TCourseProductOptionTypes) => void
}

type TState =
  | { type: 'Idle' }
  | { type: 'Pending' }
  | { type: 'Success' }
  | { type: 'Error', error: string };

  const optionTypes = ['OPTIMAL', 'BASE'] as const;

export default function DecisionForm(props: IProps) {
  const personalDiscount = discountService.useDiscount();
  const navigate = useNavigate();
  const [state, setState] = useState<TState>({ type: 'Idle' });
  const [popupOption, setPopupOption] = useState<keyof ICourseData['productOptions'] | null>(null);
  const user = userService.useAuthedUser();

  const [isQuarterly, setIsQuarterly] = useState(true);

  return (
    <>
      <div data-bcpink id={PricingID}/>
      <div className={classes.header}>
        <div className={classes.header__title}>{t('home.title')}</div>
        <div className={classes.header__description}>{t('home.description')}</div>
      </div>
      <div className={classes.switchWrapper}>
        <div
          className={cx({ switch: true, switch_off: !isQuarterly })}
          onClick={() => setIsQuarterly(!isQuarterly)}
        >
          <div className={classes.label}>{t('home.switchLabel')}</div>
          <div className={classes.icon}>
            <div className={classes.fill}></div>
            <div className={classes.switchPin}></div>
          </div>
        </div>
      </div>
      <div className={classes.group}>
        <div className={cx({ plan: true, free: true})}>
          <div className={classes.planHeader}>
            <div className={classes.subscriptionPlan}>{t('card.subscriptionType.free')}</div>
          </div>
          <div className={classes.price}>
            <span className={classes.price__number}>{t('card.priceRub.free')}</span>
          </div>
          <div className={classes.subtitle}>
            <span>{t('card.subtitle.free')}</span>
          </div>
          {authService.isAuthenticated ? (
            <button
              disabled
              className={classes.btn}
            >
             <div className={classes.text}>{t('card.btn.freeUser')}</div>
           </button>
          ) : (
           <div
             className={classes.btn}
             onClick={props.onNotAuthedClick}
           >
             <div className={classes.text}>{t('card.btn.freeVisitor')}</div>
           </div>
         )}
          <div className={classes.description}>{t('card.description.free')}</div>
          <ul className={classes.list}>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.free.item1')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item1')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item2')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item3')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item4')}</div>
            </li>
          </ul>
        </div>
        <div className={cx({ plan: true, pro: true})}>
          <div className={classes.planHeader}>
            <div className={classes.subscriptionPlan}>{t('card.subscriptionType.pro')}</div>
            {isQuarterly && (
              <div className={classes.discount}>{t('card.discount.3m')}</div>
            )}
          </div>
          <div className={classes.price}>
            <span className={classes.price__number}>{t(`card.priceRub.${isQuarterly ? 'quarterly' : 'monthly'}_1m`)}</span>
          </div>
          <div className={classes.subtitle}>
            <span>{t(`card.subtitle.pro_${isQuarterly ? 'quarterly' : 'monthly'}`)}</span>
            {isQuarterly && (
              <>
                <span>{t('card.priceRub.monthly_3m')}</span>
                <span>{t('card.priceRub.quarterly_3m')}</span>
              </>
            )}
          </div>
          <Link
            target='_blank'
            className={classes.btn}
            to={isQuarterly ? QUARTERLY_ORDER_URL : MONTHLY_ORDER_URL}
          >
            <div className={classes.text}>{t('card.btn.pro')}</div>
          </Link>
          <div className={classes.description}>{t('card.description.pro')}</div>
          <ul className={classes.list}>
            <li className={classes.item}>
              <div className={cx({ item__icon: true, item__icon_pro: true})}><Icon icon='Pro'/></div>
              <div className={classes.item__text}>{t('card.list.pro.item1')}</div>
            </li>
            <li className={classes.item}>
              <div className={cx({ item__icon: true, item__icon_pro: true})}><Icon icon='Pro'/></div>
              <div className={classes.item__text}>{t('card.list.pro.item2')}</div>
            </li>
            {/* <li className={classes.item}>
              <div className={cx({ item__icon: true, item__icon_pro: true})}><Icon icon='Pro'/></div>
              <div className={classes.item__text}>{t('card.list.pro.item3')}</div>
            </li> */}
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item1')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item2')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item3')}</div>
            </li>
            <li className={classes.item}>
              <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
              <div className={classes.item__text}>{t('card.list.both.item4')}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.conditionDescription}>{t('home.conditionDescription')}</div>
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
