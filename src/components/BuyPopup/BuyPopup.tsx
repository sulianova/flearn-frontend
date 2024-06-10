import classnames from 'classnames/bind';
import { useState } from 'react';

import Cross from 'assets/images/Svg/Cross';
import ArrowButton from 'assets/images/Svg/ArrowButton';
import Popup from 'ui/Popup/Popup';

import Decision from './steps/Decision';
import OrderInfo from './steps/OrderInfo';
import Payment from './steps/Payment';

import classes from './BuyPopup.module.scss';

const cx = classnames.bind(classes);

interface IProps {
  close: () => void
}

type TStep =
  | 'DECISION'
  | 'PAYMENT'
  | 'ORDER_INFO';

export default function BuyPopup({ close }: IProps) {
  const [step, setStep] = useState<TStep>('DECISION');

  return (
    <Popup>
      <div className={classes.__}>
        <div className={classes.close} onClick={close}>
          <Cross/>
        </div>
        {step !== 'DECISION' && (
          <div
            className={classes.back}
            onClick={() => setStep(({
              'PAYMENT': 'DECISION',
              'ORDER_INFO': 'PAYMENT',
            } as const)[step])}
          >
            <ArrowButton/>
          </div>
        )}
        <div className={classes.body}>
          <div className={classes.header}>
            <div className={classes.stepWidget}>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: step === 'DECISION' })  + ' s-text-16'}>о курсе</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: step === 'PAYMENT' })  + ' s-text-16'}>способы оплаты</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: step === 'ORDER_INFO' })  + ' s-text-16'}>подтверждение</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: step === 'DECISION' })  + ' s-text-16'}>1</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: step === 'PAYMENT' })  + ' s-text-16'}>2</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: step === 'ORDER_INFO' })  + ' s-text-16'}>3</div>
            </div>
          </div>
          {step === 'DECISION' && <Decision next={() => setStep('PAYMENT')} />}
          {step === 'PAYMENT' && <Payment next={() => setStep('ORDER_INFO')} />}
          {step === 'ORDER_INFO' && <OrderInfo next={close} />}
        </div>
      </div>
    </Popup>
  );
}
