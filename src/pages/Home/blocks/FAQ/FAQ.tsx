import type { ICourseData, ICourseFaqItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Link from 'ui/Link/Link';

import classes from './FAQ.module.scss';
import Card, { type IProps as QA } from './Card/Card';

export default FAQ;

const t = formatI18nT('home.faq');
const data: QA[] = [
  {
    question: `${t('item1.question')}`,
    answer: `${t('item1.answer')}`,
  },
  {
    question: `${t('item2.question')}`,
    answer: `${t('item2.answer')}`,
  },
  {
    question: `${t('item3.question')}`,
    answer: `${t('item3.answer')}`,
  },
  {
    question: `${t('item4.question')}`,
    answer: `${t('item4.answer')}`,
  },
  {
    question: `${t('item5.question')}`,
    answer: `${t('item5.answer')}`,
  },
  {
    question: `${t('item6.question')}`,
    answer: `${t('item6.answer')}`,
  },
  {
    question: `${t('item7.question')}`,
    answer: `${t('item7.answer')}`,
  },
  {
    question: `${t('item8.question')}`,
    answer: `${t('item8.answer')}`,
  },
];


function FAQ() {
  return (
    <>
      <div data-bcalternate/>
      <div className={classes.header}>
        <div className={classes.header__title}>{t('title')}</div>
      </div>
      <div className={classes.list}>
        {data.map((qa, index) => <Card key={index} {...qa}/>)}
      </div>
    </>
  );
}