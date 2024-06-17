import classnames from 'classnames/bind';
import { useState } from 'react';

import Decision from './steps/Decision';
import OrderInfo from './steps/OrderInfo';
import Payment from './steps/Payment';

import Popup from 'ui/Popup/Popup';
import Icon from 'ui/Icon/Icon';

import classes from './BuyPopup.module.scss';
import { ICourseData } from 'services/course.service';

const cx = classnames.bind(classes);

interface IProps {
  close: () => void
  course: ICourseData
}

type TStep =
  | 'DECISION'
  | 'PAYMENT'
  | 'ORDER_INFO';

export default function BuyPopup({ close, course }: IProps) {
  const [step, setStep] = useState<TStep>('DECISION');

  return (
    <Popup>
      <div className={classes.__}>
        <div className={classes.close} onClick={close}>
          <Icon icon='Cross'/>
        </div>
        {step !== 'DECISION' && (
          <div
            className={classes.back}
            onClick={() => setStep(({
              'PAYMENT': 'DECISION',
              'ORDER_INFO': 'PAYMENT',
            } as const)[step])}
          >
            <Icon icon='ArrowButton'/>
          </div>
        )}
        <div className={classes.body}>
          <div className={classes.header}>
            <div className={classes.stepWidget}>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: step === 'DECISION' })}>о курсе</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: step === 'PAYMENT' })}>способы оплаты</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: step === 'ORDER_INFO' })}>подтверждение</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: step === 'DECISION' })}>1</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: step === 'PAYMENT' })}>2</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: step === 'ORDER_INFO' })}>3</div>
            </div>
          </div>
          {step === 'DECISION' && <Decision course={course} next={() => setStep('PAYMENT')} />}
          {step === 'PAYMENT' && <Payment course={course} next={() => setStep('ORDER_INFO')} />}
          {step === 'ORDER_INFO' && <OrderInfo course={course} next={close} />}
        </div>
      </div>
    </Popup>
  );
}
