import classnames from 'classnames/bind';
import { useState } from 'react';

import { formatI18nT } from 'shared';
import Checkbox from 'ui/Form/Checkbox/Checkbox';
import Link from 'ui/Link/Link';

import classes from './Payment.module.scss';
import type { IProps } from './types';
import { ICourseData } from 'services/course.service';
import { formatCourseCredit, getDiscountedPrice } from 'utils';
import { emailService } from 'services/email.service';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';
import { analyticsService } from 'services/analytics.service';
import { discountService } from 'services/discount.service';
import { getDiscount } from './utils';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

export default function Payment(props: IProps & { chosenProductOptionType: keyof ICourseData['productOptions'] }) {
  const { next, chosenProductOptionType } = props;
  const personalDiscount = discountService.useDiscount();
  const { creditPrice: creditPriceRub, creditWas: creditWasRub, discount } = getDiscount(personalDiscount, chosenProductOptionType);
  const [isPending, setIsPending] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const [paymentOption, setPaymentOption] = useState<'CARD_RU' | 'PAYPAL'>('PAYPAL');
  const creditWas = Math.round(paymentOption === 'CARD_RU' ? creditWasRub : creditWasRub / 100);
  const creditPrice = Math.round(paymentOption === 'CARD_RU' ? creditPriceRub : creditPriceRub / 100);
  const currencySign = paymentOption === 'CARD_RU' ? '\u20BD' : '\u20AC';
  return (
    <div className={classes.paymentWrapper}>
      <div className={classes.paymentBlock}>
        <div className={classes.headerWrapper}>
          <h1 className={classes.title}>{t(`options.${chosenProductOptionType}.caption`)}</h1>
          <div className={classes.benefits}>
            <div className={classes.benefitsItem}>
              <div className={classes.itemIcon}><Icon icon='TickInCircle'/></div>
              <div className={classes.itemText}>Чат</div>
            </div>
            <div className={classes.benefitsItem}>
              <div className={classes.itemIcon}><Icon icon='TickInCircle'/></div>
              <div className={classes.itemText}>Уроки</div>
            </div>
            { chosenProductOptionType === 'OPTIMAL' && (
              <div className={classes.benefitsItem}>
                <div className={classes.itemIcon}><Icon icon='TickInCircle'/></div>
                  <div className={classes.itemText}>Фидбэк</div>
              </div>
            )}
          </div>
          <div className={classes.paymentOptions}>
            <div className={classes.paymentOptionsTitle}>Как и чем платить</div>
            <div className={classes.groupToggleOptions}>
              <div className={classes.groupToggleOption} onClick={() => setPaymentOption('CARD_RU')}>
                <label className={cx({groupToggleLabel: true, checked: paymentOption === 'CARD_RU' })}>На карту Тинькофф</label>
              </div>
              <div className={classes.groupToggleOption} onClick={() => setPaymentOption('PAYPAL')}>
                <label className={cx({groupToggleLabel: true, checked: paymentOption === 'PAYPAL' })}>PayPal</label>
              </div>
            </div>
            {paymentOption === 'CARD_RU' && (
              <div className={classes.optionDescription}>
                На карту Тинькофф по номеру телефона +79162380397 Ульянова С.
              </div>
            )}
            {paymentOption === 'PAYPAL' && (
              <div className={classes.optionDescription}>
                Через Paypal на аккаунт <Link to={"http://paypal.me/sofiulyanova"} target='_blank'>paypal.me/sofiulyanova</Link> (Ulianova Sofiia)
              </div>
            )}
          </div>
        </div>
        <div className={classes.bottom}>
          <dl className={classes.paymentSummary}>
              <dt>
                <span className={classes.paymentSummaryText}>За весь курс</span>
                <div className={classes.paymentSummaryTags}>
                  <span className={classes.paymentSummaryTag}>{`−${discount ?? 0}% по промокоду`}</span>
                </div>
              </dt>
              <dt>
                <span className={classes.paymentSummaryText}>{formatCourseCredit(creditPrice, currencySign)}</span>
                <div className={classes.paymentSummaryCreditWas}>
                  <s>{formatCourseCredit(creditWas, currencySign)}</s>
                </div>
              </dt>
            </dl>
          <div className={classes.paymentCheck}>
            <Checkbox value={isPayed} onChange={() => setIsPayed(!isPayed)}>Перевод отправил, готов учиться!</Checkbox>
          </div>
          <button
            disabled={!isPayed}
            className={classes.btn}
            onClick={() => {
              next();
              // analyticsService.logEvent({ type: analyticsService.event.Purchase });
              // setIsPending(true);
              // emailService.sendEmail({
              //   type: emailService.EEmail.WelcomeToPaidCourse,
              //   course,
              //   to: {
              //     email: user.email,
              //     name: user.displayName ?? undefined,
              //   },
              //   paymentOption: paymentOption,
              //   productOption: chosenProductOptionType,
              //   dateOfPaiment: new Date(),
              // })
              //   .then(next)
              //   .finally(() => setIsPending(false));
            }}
          >
            {isPending ? <Spinner/> : 'Подтвердить перевод'}
          </button>
        </div>
      </div>
    </div>
  );
}