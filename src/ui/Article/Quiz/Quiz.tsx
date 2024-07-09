import classNames from 'classnames/bind';

import type { IArticleQuizBlock } from 'types';

import UIText from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './Quiz.module.scss';

const cx = classNames.bind(classes);

export default function Quiz({ quiz, factoid }: Omit<IArticleQuizBlock, 'type'>) {
  if (!quiz) {
    return null;
  }

  return (
    <>
    <div className={classes.__}>
      <div className={classes.wrapper}>
        <form className={classes.content}>
          <div className={classes.quizHeader}>
            <div className={classes.quizTitle}>Задание</div>
            <div className={classes.quizDescription}>Рыбный текст для задания, а точнее вопроса, на который нужно дать ответ.</div>
          </div>
          <fieldset className={classes.quizGroup} role={'radiogroup'}>
            <label className={classes.choiceOption}>
              <div className={cx({radio: true, checked: false, shouldBeChecked: false, shouldNotBeChecked: true })}>
                <span className={classes.visuallyHidden}>
                  <input type="radio" value="no"/>
                </span>
                <div className={classes.icon}>
                  <Icon icon='Tick'/>
                </div>
              </div>
              <span>Нет, впервые знакомлюсь с профессией</span>
            </label>
            <label className={classes.choiceOption}>
              <div className={cx({ radio: true, checked: true, shouldBeChecked: true, shouldNotBeChecked: false })}>
                <span className={classes.visuallyHidden}>
                  <input type="radio" value="no"/>
                </span>
                <div className={classes.icon}>
                  <Icon icon='SmallCross'/>
                </div>
              </div>
              <span>Нет, впервые знакомлюсь с профессией</span>
            </label>
            <div className={classes.feedback}>Это подробное описвание ответа. Это подробное описвание ответа. Это подробное описвание ответа. Это подробное описвание ответа.</div>
          </fieldset>
          <button disabled={true} className={classes.submitButton}>Узнать ответ</button>
        </form>
      </div>
    </div>
    </>
  );
}
