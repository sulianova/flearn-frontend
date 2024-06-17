import classnames from 'classnames/bind';
import { useState } from 'react';

import { formatI18nT } from 'shared';
import Checkbox from 'ui/Form/Checkbox/Checkbox';
import Link from 'ui/Link/Link';

import classes from '../BuyPopup.module.scss';
import type { IProps } from './types';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

export default function Payment(props: IProps) {
  const [option, setOption] = useState<'CARD_RU' | 'PAYPAL'>('CARD_RU');
  const [isPayed, setIsPayed] = useState(false);
  return (
    <div className={classes.paymentWrapper}>
      <div className={classes.paymentBlock}>
        <div className={classes.paymentHeaderWrapper}>
          <h1 
            className={classes.title}>Оплата курса «Композиция: как выделить главное»
          </h1>
          <div className={classes.paymentOptions}>
          <div className={classes.groupToggleOptions}>
            <div className={classes.groupToggleOption} onClick={() => setOption('CARD_RU')}>
              <label className={cx({groupToggleLabel: true, checked: option === 'CARD_RU' })}>На карту Тинькофф</label>
            </div>
            <div className={classes.groupToggleOption} onClick={() => setOption('PAYPAL')}>
              <label className={cx({groupToggleLabel: true, checked: option === 'PAYPAL' })}>PayPal</label>
            </div>
          </div>
          {option === 'CARD_RU' && (
            <div className={classes.optionDescription}>
              На карту Тинькофф по номеру телефона +79162380397 Ульянова С.
            </div>
          )}
          {option === 'PAYPAL' && (
            <div className={classes.optionDescription}>
              Через Paypal на аккаунт <Link to={"http://paypal.me/sofiulyanova"} target='_blank'>paypal.me/sofiulyanova</Link> (Ulianova Sofiia)
            </div>
          )}
        </div>
          <div className={classes.credit}>
            <div className={classes.creditWasWrapper}><s className={classes.creditWas}>3000 &#8381;</s></div>
            <div className={classes.creditPrice}>
              1000 &#8381;
              <span className={classes.discount}>-30%</span>
            </div>
        </div>
        </div>
        <div className={classes.paymentCheck}>
          <Checkbox value={isPayed} onChange={() => setIsPayed(!isPayed)}>Перевод отправил, готов учиться!</Checkbox>
        </div>
        <button disabled={!isPayed} className={classes.btn} onClick={props.next}>Подтвердить перевод</button>
      </div>
    </div>
  );
}