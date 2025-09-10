import classnames from 'classnames/bind';
import { useState } from 'react';

import { formatI18nT, i18n } from 'shared';

import classes from './Decision.module.scss';
import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import { formatCourseCredit } from 'utils';
import { TCourseProductOptionTypes } from 'services/course.service';
import { discountService } from 'services/discount.service';
import { getDiscount } from './utils';

import { authService } from 'services/auth.service';
import { userService, type IUserData } from 'services/user.service';
import { MONTHLY_ORDER_URL, QUARTERLY_ORDER_URL } from 'utils/order';

const cx = classnames.bind(classes);
const t = formatI18nT('decision');

interface IProps {
  // linkToFreeCourse: string
  onNotAuthedClick: () => void
  next: (productOptionType: TCourseProductOptionTypes) => void
}

const optionTypes = ['OPTIMAL', 'BASE'] as const;

export default function Decision(props: IProps) {
  const [isQuarterly, setIsQuarterly] = useState(true);
    const user = userService.useAuthedUser();

  const personalDiscount = discountService.useDiscount();
  const optionsNodes = optionTypes.map(type => {
    const options =
      type === 'BASE' ? ['1', '2', '3']
      : type === 'OPTIMAL' ? ['1', '2', '3', '4', '5']
      : [];
    const { creditPrice, creditWas, discount } = getDiscount(personalDiscount, type);
    return (
      <></>
      // <div className={cx({ block: true, blockDetails: type === 'OPTIMAL', active: false })} key={type} id={type}>
      //   <h2 className={classes.courseName}>
      //     {t(`options.${type}.caption`)}
      //   </h2>
      //   <h3 className={classes.title}>{t(`options.${type}.title`)}</h3>
      //   <ul className={classes.pricingCheckList}>
      //     {options.map(key => (
      //       <li className={classes.pricingCheckListItem} key={key}>
      //         <div className={classes.itemIcon}><Icon icon='TickInCircle'/></div>
      //         <div className={classes.itemText}>{i18n.t(`product.${type}.${key}`)}</div>
      //       </li>
      //     ))}
      //   </ul>
      //   <dl className={classes.paymentSummary}>
      //     <dt>
      //       <div className={classes.creditPrice}>
      //         {formatCourseCredit(creditPrice)} &#8381;
      //       </div>
      //       <div className={classes.creditWas}>
      //         <s>{formatCourseCredit(creditWas)}</s>
      //       </div>
      //     </dt>
      //     <dt>
      //       <div className={classes.discountTags}>
      //         <span className={classes.discountTag}>{`−${discount ?? 0}%`}</span>
      //       </div>
      //     </dt>
      //   </dl>
      //   <button
      //     className={classes.cardBtn + ' btn'}
      //     onClick={() => next(type)}
      //   >
      //     Перейти к оплате
      //   </button>
      // </div>
    );
  });

  return (
    <>
      <div className={classes.section}>
        <div className={classes.header}>
          <div className={classes.header__title}>Начните рисовать сегодня</div>
          <div className={classes.header__description}>100+ иллюстраторов регулярно занимаются с flearn</div>
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
          //  to={props.linkToFreeCourse}
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
          {/* <li className={classes.item}>
            <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
            <div className={classes.item__text}>{t('card.list.both.item4')}</div>
          </li> */}
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
          {/* <li className={classes.item}>
            <div className={classes.item__icon}><Icon icon='CheckmarkFill'/></div>
            <div className={classes.item__text}>{t('card.list.both.item4')}</div>
          </li> */}
        </ul>
      </div>
    </div>
        <div className={classes.conditionDescription}>{t('home.conditionDescription')}</div>
      </div>
    </>
  );
}
