import { Author } from 'assets/images';
import classNames from 'classnames/bind';
import classes from './Teachers.module.scss';

export default Teachers;

const cx = classNames.bind(classes);

function Teachers() {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title + ' s-text-56'}> Преподаватель</h2>
      <div className={classes.section}>
        <div className={classes.card}>
          <div className={classes.cardTitle + ' s-text-36'}>София Ульянова</div>
          <div className={classes.cardDesc + ' s-text-24'}>
            Художник, автор курса. Закончила Британскую Высшую Школу Дизайна по курсу иллюстрация.
            Участвую в международных конкурсах для иллюстраторов. Рисую для себя и творческих проектов.
          </div>
        </div>
        <div className={cx({ card: true, cardMedia: true })}><img alt='Автор курса' src={Author}/></div>
      </div>
    </div>
  );
}
