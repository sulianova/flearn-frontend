import type { IProps } from './types';

import classes from './OrderInfo.module.scss';

export default function OrderInfo({ user, course }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <h3 className={classes.title}>{`Вы записались на курс «${course.title}»`}</h3>
        <div className={classes.description}>
          <p>{`Мы получили ваше подтверждение об оплате. В течении 1-2 рабочих дней откроем доступ к материалам.`}</p>
          <p><span>Пришлем письмо на почту</span><span className={' bold blue'}>{` ${user.email} `}</span><span>со ссылкой на первый платный урок.</span></p>
        </div>
      </div>
    </div>
  );
}
