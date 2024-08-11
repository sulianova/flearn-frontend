import type { ICourseData, ICourseFaqItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Link from 'ui/Link/Link';

import classes from './FAQ.module.scss';
import Item, { type IProps as QA } from './Item/Item';

export default FAQ;

const t = formatI18nT('courseLanding.faq');
const data: QA[] = [
  {
    question: 'Как проходит онлайн обучение',
    answer: 'Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона. Вопросы, возникающие по ходу задаем в любое время в телеграмм-канале — раз в сутки преподаватель отвечает на них.',
  },
  {
    question: 'Подойдут ли мне курсы, если я раньше не рисовал',
    answer: 'Да, подойдут. Курсы рассчитаны для начинающих рисовальщиков.',
  },
  {
    question: 'Сколько длится доступ к материалам',
    answer: 'Доступ к материалам останется навсегда.',
  },
];

function FAQ() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>{t('headerTitle')}</div>
      <div className={classes.list}>
        {data.map((qa, index) => <Item key={index} {...qa}/>)}
      </div>
      <div className={classes.headerDesc}>
        {t('headerDesc1')}
        <Link to={t('creatorLink')}  target='_blank'>
          <span>{t('headerDesc2')}</span>
        </Link>
        {t('headerDesc3')}
      </div>
    </div>
  );
}