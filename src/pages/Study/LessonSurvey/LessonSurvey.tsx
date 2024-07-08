import classNames from 'classnames/bind';

import classes from './LessonSurvey.module.scss';
import Icon from 'ui/Icon/Icon';

export default LessonSurvey;

const cx = classNames.bind(classes);


function LessonSurvey() {
  return (
    <div className={classes.__}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <button disabled={true} className={classes.submitButton}>Отправить</button>
        </div>
      </div>
    </div>
    // <div className={classes.__}>
    //   <div className={classes.wrapper}>
    //     <div className={classes.content}>
    //       {/* <div className={classes.successScreen}>
    //         <div className={classes.successScreenTitle}>Спасибо, мы записали ваш ответ!</div>
    //       </div> */}
    //       <div className={classes.survey}>
    //         {/* <div className={classes.surveyHeader}>
    //           <div className={classes.surveyTitle}>1/4. У&nbsp;вас есть опыт работы или учёбы по&nbsp;специальности «Иллюстратор»?</div>
    //         </div>
    //         <div className={classes.surveyAnswers}>
    //           <label className={classes.surveyAnswer}>
    //             <div className={cx({ radio: true, checked: true })}>
    //               <span className={classes.visuallyHidden}>
    //                 <input type="radio" value="no"/>
    //               </span>
    //               <div className={classes.icon}>
    //                 <Icon icon='Tick'/>
    //               </div>
    //             </div>
    //             <span>Нет, впервые знакомлюсь с профессией</span>
    //           </label>
    //           <label className={classes.surveyAnswer}>
    //             <div className={cx({ checkbox: true, checkboxWithMovementAnimation: true, checked: true })}>
    //               <span className={classes.visuallyHidden}>
    //                 <input type="checkbox" value="no"/>
    //               </span>
    //               <div className={classes.icon}>
    //                 <Icon icon='Tick'/>
    //               </div>
    //             </div>
    //             <span>Да, уже в процессе изучения или работаю в этой сфере</span>
    //           </label>
    //         </div> */}
    //         <div className={classes.surveyHeader}>
    //           <div className={classes.surveySubtitle}>Хотим зафиксировать цель, с которой вы проходите вводную часть. А в конце спросим, получилось ли её достичь.</div>
    //           <div className={classes.surveyDescription}>Выберите цель:</div>
    //         </div>
    //         <div className={classes.cards}>
    //           <button className={cx({ card: true, active: false })}>
    //             <div className={classes.cardTitle}>Пройти и оплатить</div>
    //             <div className={classes.cardSubtitle}>Подготовиться к стартру курса</div>
    //           </button>
    //           <button className={cx({ card: true, active: false })}>
    //             <div className={classes.cardTitle}>Попробовать формат</div>
    //             <div className={classes.cardSubtitle}>Понять, понравится ли мне учеба в Flearn</div>
    //           </button>
    //           <button className={cx({ card: true, active: true })}>
    //             <div className={classes.cardTitle}>Пройти только вводную часть</div>
    //             <div className={classes.cardSubtitle}>Бесплатно научиться чему-нибудь новому</div>
    //           </button>
    //         </div>
    //       </div>
    //       <button disabled={true} className={classes.submitButton}>Отправить</button>
    //     </div>
    //   </div>
    // </div>
  );
}