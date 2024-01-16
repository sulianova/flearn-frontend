import Animated from 'ui/Animated';

import classNames from 'classnames/bind';
import classes from './Item.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  question: string
  answer: string
}

export default function Item(props: IProps) {
  return (
    <Animated.Scroll>
      {(id, className) => (
        // <div className={cx({ _: true }, className)} id={id}>
        //   <div className={classes.questionWrapper}>
        //     <div className={classes.question + ' s-text-28'}>{props.question}</div>
        //   </div>
        //   <div className={classes.answear + ' s-text-24'}>{props.answer}</div>
        // </div>
        <div className={cx({ _: true }, className)} id={id}>
          <div className={classes.feedbackAuthor + ' s-text-18'}>
            <strong>Дарья,</strong>
            выпускница набора 8 янв 2024
          </div>
          <div className={classes.feedbackQuote}>
            <p>Несмотря на сжатые сроки, интенсив оказался наполненным и очень полезным, для бесплатного даже очень. Все понравилось! Единственное, что напрягало, - это маленькие сроки, но считаю это скорее плюсом, потому что тоже интересный и полезный опыт, особенно для привыкших работать медленно.</p>
            <p>До занятий были несколько абстрактные и скорее интуитивные представления о стиле, сюжете и серии, теперь они куда более структурированные, и я могу подходить ко всему этому более осознанно. Плюс, было много важных комментариев про процесс (и интересные обсуждения). Знаю новые подходы к работе. Планирую применять это все в дальнейшем! И делать серии. До этого не бралась за такое, а теперь хочется поисследовать некоторые темы и попробовать инструменты, которые узнала тут. А их много.</p>
            <p>Интенсив помог меньше бояться совершать ошибки в процессе работы, не зацикливаться и делать акцент на количестве, чтобы было из чего выбирать и от чего отталкиваться. Еще хочется упомянуть, что у меня были переживания насчет того, что я не могу определиться с материалом, а теперь понимаю, что ограничений нет, и мне гораздо спокойнее.</p>
          </div>
          <div className={classes.feedbackExcerpt + ' s-text-28'}>
          Интенсив помог меньше бояться совершать ошибки в процессе работы, не зацикливаться и делать акцент на количестве, чтобы было из чего выбирать и от чего отталкиваться.
          </div>
        </div>
      )}
    </Animated.Scroll>
  );
}
