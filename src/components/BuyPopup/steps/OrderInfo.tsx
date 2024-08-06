import type { IProps } from './types';
import Icon from 'ui/Icon/Icon';

import classes from './OrderInfo.module.scss';

export default function OrderInfo({ user, course }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <h3 className={classes.title}>{`Вы записались на курс «${course.title}»!`}</h3>
        <div className={classes.imageWrapper}><Icon icon='Paid'/></div>
        <div className={classes.description}>
          <p><span>В течении 1-2 рабочих дней пришлем письмо на почту</span><span className={' blue'}>{` ${user.email} `}</span><span>со ссылкой на первый платный урок.</span></p>
        </div>
      </div>
    </div>
  );
}
