import classNames from 'classnames/bind';
import classes from './Card.module.scss';

import Link from 'ui/Link/Link';

export default function Card() {
  return (
    <div className={classes.__}>
      <div className={classes.preview}>
        <Link className={classes.previewLink}></Link>
        <img></img>
      </div>
      <div className={classes.content}>
        <Link className={classes.title + ' s-text-56'}>Как рисовать</Link>
        <div className={classes.info}>
          <div className={classes.infoDate + ' s-text-24'}>29 апреля – 19 мая | 3 недели</div>
        </div>
        <div className={classes.description + ' s-text-18'}>Базовый курс по иллюстрации. За 3 недели научимся уверенно рисовать любые сюжеты. Узнаем, как управлять вниманием зрителя</div>
        <div className={classes.tags}>
          <span className={classes.hashTag}>#</span>
          <span className={classes.tag + ' s-text-16'}>композиция</span>
          <span className={classes.tag+ ' s-text-16'}>рисование по фото</span>
          <span className={classes.tag+ ' s-text-16'}>наброски</span>
          <span className={classes.tag+ ' s-text-16'}>персонаж</span>
        </div>
      </div>
    </div>
  );
}


// function renderTags () {
//   return props.map((d, index) => (<span key={index} {...d}> </span>));
// }
