import type { ICourseData, ICourseFaqItem } from 'services/course.service';
import { formatI18nT } from 'shared';

import Link from 'ui/Link/Link';

import classes from './FAQ.module.scss';
import Item, { type IProps as QA } from './Item/Item';

export default FAQ;

const t = formatI18nT('courseLanding.faq');
const data: QA[] = [
  {
    question: 'Что такое подписка flearn Pro?',
    answer: 'Подписка flearn Pro — это безлимитный доступ к знаниям по выгодной цене, много практических заданий и живой обратной связи. Отменить подписку можно в любой момент.',
  },
  {
    question: 'Какие курсы входят в подписку?',
    answer: 'Курсы, которые входят в подписку, можно посмотреть в разделе «Курсы».',
  },
  {
    question: 'Подойдут ли мне курсы, если я раньше не рисовал?',
    answer: 'Да, подойдут. Курсы рассчитаны для начинающих рисовальщиков.',
  },
  {
    question: 'Сколько стоит подписка flearn Pro?',
    answer: 'У подписки есть два тарифа: на 1 месяц – 2990 рублей и 3 месяца – 6 990 рублей. Если хотите пройти несколько курсов, выгоднее оформить подписку на 3 месяца.',
  },
  {
    question: 'А можно оплатить подписку заубежной картой?',
    answer: 'Да, можно. Мы принимаем оплату через PayPal или с российской карты.',
  },
  {
    question: 'Зачем оформлять подписку, если можно смотреть бесплатные видео в интернете?',
    answer: 'Конечно, можно смотреть и их. Но нужно потратить много часов и даже дней, чтобы найти действительно качественный контент. С подпиской вы экономите время и получаете доступ к достоверной информации, которая подана в увлекательной и понятной форме.',
  },
  {
    question: 'Что произойдет с моими данными, если я отменю подписку flearn Pro?',
    answer: 'После отмены подписки, у вас сохранится прогресс, достижения и сертификаты. А вот доступ к материалам курсов, которые вы уже прошли будет закрыт. Если позже решите снова стать участником flearn Pro, то доступ ко всем материалам будет восстановлен.',
  },
  {
    question: 'У вас есть скидки для школьников и студентов?',
    answer: 'Да, у нас есть скидка 62.5% для flearn Pro на 3 месяца. Чтобы получить скидку, пришлите на почту flearn.info@gmail.com подтверждение о том, что вы учитесь в гос. учреждении. Подойдет справка об обучении или скан студенческого билета.',
  },
];

function FAQ() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.header__title}>Вопросы и ответы</div>
        <div className={classes.header__description}>
          {t('headerDesc1')}
          <Link to={t('creatorLink')}  target='_blank'>
            <span>{t('headerDesc2')}</span>
          </Link>
          {t('headerDesc3')}
        </div>
      </div>
      <div className={classes.list}>
        {data.map((qa, index) => <Item key={index} {...qa}/>)}
      </div>
    </div>
  );
}