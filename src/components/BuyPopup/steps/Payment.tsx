import classnames from 'classnames/bind';
import { useState } from 'react';

import { formatI18nT } from 'shared';
import Checkbox from 'ui/Form/Checkbox/Checkbox';
import Link from 'ui/Link/Link';

import classes from './Payment.module.scss';
import type { IProps } from './types';
import { ICourseData } from 'services/course.service';
import { formatCourseCredit, formatCourseDiscount, getDiscountedPrice } from 'utils';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

export default function Payment(props: IProps & { chosenProductOptionType: keyof ICourseData['productOptions'] }) {
  const { next, course, chosenProductOptionType } = props;
  const chosenProductOption = course.productOptions[chosenProductOptionType]!;
  const [isPayed, setIsPayed] = useState(false);
  const [paymentOption, setPaymentOption] = useState<'CARD_RU' | 'PAYPAL'>('CARD_RU');
  const { creditWas: creditWasRub, creditPrice: creditPriceRub, discount } = getDiscountedPrice(course.discount, chosenProductOption);
  const creditWas = Math.round(paymentOption === 'CARD_RU' ? creditWasRub : creditWasRub / 100);
  const creditPrice = Math.round(paymentOption === 'CARD_RU' ? creditPriceRub : creditPriceRub / 100);
  const currencySign = paymentOption === 'CARD_RU' ? '\u20BD' : '\u20AC';
  return (
    <div className={classes.paymentWrapper}>
      <div className={classes.paymentBlock}>
        <div className={classes.headerWrapper}>
          <h1 
            className={classes.title}>Оплата курса «Композиция: как выделить главное»
          </h1>
          <div className={classes.credit}>
            {/* <div className={classes.creditWasWrapper}><s className={classes.creditWas}>{formatCourseCredit(creditWas, currencySign)}</s></div> */}
            <div className={classes.creditPrice}>
              {formatCourseCredit(creditPrice, currencySign)}
              {/* <span className={classes.discount}>{formatCourseDiscount(discount ?? 0)}</span> */}
            </div>
          </div>
          <dl className={classes.paymentSummary}>
            <dt>
              <span>За весь курс</span>
              <div className={classes.paymentSummaryTags}>
                <span className={classes.paymentSummaryTag}>−5% по промокоду</span>
              </div>
            </dt>
            <dt>
              {formatCourseCredit(creditPrice, currencySign)}
              <div className={classes.paymentSummaryCreditWas}>
                <s>{formatCourseCredit(creditWas)} &#8381;</s>
              </div>
            </dt>
          </dl>
        </div>
        <div className={classes.bottom}>
          <div className={classes.paymentOptions}>
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
          <div className={classes.paymentCheck}>
            <Checkbox value={isPayed} onChange={() => setIsPayed(!isPayed)}>Перевод отправил, готов учиться!</Checkbox>
          </div>
          <button disabled={!isPayed} className={classes.btn} onClick={next}>Подтвердить перевод</button>
        </div>
      </div>
    </div>
  );
}