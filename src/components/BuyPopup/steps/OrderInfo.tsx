import type { IProps } from './types';

import classes from './OrderInfo.module.scss';

export default function OrderInfo(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <h3 className={classes.title}>Вы записались на курс «»</h3>
        <div className={classes.description}>
          <p>Мы получили ваше подтверждение об оплате. В течении 1-2 рабочих дней откроем доступ к материалам и пришлем письмо на почту со ссылкой на первый платный урок.</p>
        </div>
      </div>
    </div>
  );
}
