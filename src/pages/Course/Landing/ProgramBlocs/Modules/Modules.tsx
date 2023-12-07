import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import classes from './Modules.module.scss';

import { ICourseData } from 'types';
import Text from 'ui/Text/Text';

export default Modules;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

interface IProps {
  modules: ICourseData['modules']
  data: ICourseData
}

function Modules(props: IProps) {
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <h2 className={cx({ title: true }) + ' s-text-56'} >Подарки для участников интенсива</h2>
        <div className={classes.listItem}>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemTitle + ' s-text-28'}>Cкидка 50% на курс “Как рисовать”</div>
            {/* <div className={classes.listItemContent + ' s-text-24'}>скидка 50% на курс “Как рисовать”</div> */}
          </div>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemTitle + ' s-text-28'}>Приглашение в телеграм-чат выпускников школы flearn</div>
            <div className={classes.listItemContent + ' s-text-24'}>В чате мы задаем любые вопросы по рисованию, делимся радостями, горестями, лайфхаками и красивыми картинками, поддерживаем друг друга и болтаем.</div>
          </div>
        </div>
        <div className={classes.listItem}>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemTitle + ' s-text-36'}>Что получится в результате</div>
            <div className={classes.listItemContent + ' s-text-24'}>Вы создадите серию графических работ из 3-5 иллюстраций, которая продемонстрирует ваши хард-скилы и подчеркнет ценности. Тема серии свободная: от лягушки до автопортрета.</div>
          </div>
          <div className={cx({ listItemCard: true })}>
            <div className={classes.listItemMedia}></div>
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h2 className={cx({ title: true }) + ' s-text-56'} >{t('title')}</h2>
          <div className={classes.desc + ' s-text-24'}>{<Text text={props.data.modulesDescription}/>}</div>
          <div className={classes.tags}>
            <div className={classes.tag + ' s-text-18'}>{t('videosNumber', { count: props.data.videosNumber })}</div>
            <div className={classes.tag + ' s-text-18'}>{t('homeworksNumber', { count: props.data.homeworksNumber })}</div>
            <div className={classes.tag + ' s-text-18'}>{t('durationWeeks', { count: props.data.durationWeeks })}</div>
            <div className={classes.tag + ' s-text-18 b-black-new'}>{t('feedback')}</div>
            <div className={classes.tag + ' s-text-18 b-black-new'}>{t('chat')}</div>
          </div>
        </div>
        <div className={classes.list}>
          {renderItems(props.modules)}
        </div>
      </div>
    </Fragment>
  );
}

function renderItem(props: ICourseData['modules'][number]) {
  return (
    <div className={classes.listItem}>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ listItemCard: true }, className)} id={id}>
            <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
            <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
            <div className={classes.listItemContent + ' s-text-24'}><Text text={props.content}/></div>
          </div>
        )}
      </Animated.Scroll>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ listItemCard: true }, className)} id={id}>
            <div className={classes.listItemMedia}><Image src={props.imageSrc} alt={props.imageAlt}/></div>
            <div className={classes.listItemMediaDesc + ' s-text-18'}><Text text={props.imageDesc}/></div>
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}

function renderItems(props: ICourseData['modules'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
