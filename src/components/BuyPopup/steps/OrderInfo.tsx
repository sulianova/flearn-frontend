import type { IProps } from './types';

import classes from './OrderInfo.module.scss';

export default function OrderInfo({ user, course }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <h3 className={classes.title}>{`Вы записались на курс «${course.title}»`}</h3>
        <div className={classes.description}>
          <p>{`Мы получили ваше подтверждение об оплате. В течении 1-2 рабочих дней откроем доступ к материалам.`}</p>
          <p>{`Пришлем письмо на почту ${user.email} со ссылкой на первый платный урок.`}</p>
        </div>
      </div>
    </div>
  );
}
