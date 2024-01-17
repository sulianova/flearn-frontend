import { Fragment } from 'react';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';
import classes from './FAQ.module.scss';

import classNames from 'classnames/bind';
import type { ICourseData } from 'services/course.service';
import Text from 'ui/Text/Text';

export default FAQ;

const t = formatI18nT('courseLanding.faq');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function FAQ(props: IProps) {
  if (props.data.faq.length === 0) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      {/* <div className={classes.header}>
        <h2 className={classes.headerTitle + ' s-text-56'}>{t('headerTitle')}</h2>
        <div className={classes.headerDesc + ' s-text-24'}>
          {t('headerDesc1')}
          <Link to={t('creatorLink')}  target='_blank'>
            <span className='key-link'>{t('headerDesc2')}</span>
          </Link>
          {t('headerDesc3')}
        </div>
      </div>
      <div className={classes.list}>
        {renderItems(props.data.faq)}
      </div> */}
      <div className={classes.header}>
        <h2 className={classes.headerTitle + ' s-text-56'}>Как проходит обучение</h2>
      </div>
      <div className={classes.item}>
        <h3 className={classes.title + ' s-text-36'}>Задания и теория</h3>
        <div className={classes.desc + ' s-text-24'}>Работаем на платформе школы. Все учебные материалы: текст, фото и видео-уроки доступны в личном кабинете на сайте. Их можно пересматривать в любое время.</div>
        <div className={classes.videoCard}>
            <div className={classes.videoCardContainer}>
              {/* {props.data.explainMedia.type === 'image' ? (
                <Img
                  src={props.data.explainMedia.imageSrc}
                  alt={props.data.explainMedia.imageAlt}
                />
              ): (
                <Video.IFrame
                  src={props.data.explainMedia.src}
                  title={props.data.explainMedia.title}
                />
              )} */}
            </div>
          </div>
      </div>
      <div className={classes.item}>
        <h3 className={classes.title + ' s-text-36'}>Вопросы по ходу</h3>
        <div className={classes.desc + ' s-text-24'}>Вопросы, возникающие по ходу, задаем в любое время — раз в сутрки преподаватель отвечает на них.</div>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            {/* {props.data.explainMedia.type === 'image' ? (
              <Img
                src={props.data.explainMedia.imageSrc}
                alt={props.data.explainMedia.imageAlt}
              />
            ): (
              <Video.IFrame
                src={props.data.explainMedia.src}
                title={props.data.explainMedia.title}
              />
            )} */}
          </div>
        </div>
      </div>
      <div className={classes.item}>
        <h3 className={classes.title + ' s-text-36'}>Обратная связь</h3>
        <div className={classes.desc + ' s-text-24'}>
          <p>Индивидуальная обратная связь по домашним заданиям. Преподаватель создает для каждого участника рабочий холст в Figma, где можно писать комментарии, прикладывать фото и ссылки.</p>
          <p>Чтобы отвечать на комментарии, вести диалог, нужно залогиниться под любой почтой в Figma. С ноутбука это можно сделать в любом браузере, с телефона вначале нужно скачать приложение Figma и установить его.</p>
        </div>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            {/* {props.data.explainMedia.type === 'image' ? (
              <Img
                src={props.data.explainMedia.imageSrc}
                alt={props.data.explainMedia.imageAlt}
              />
            ): (
              <Video.IFrame
                src={props.data.explainMedia.src}
                title={props.data.explainMedia.title}
              />
            )} */}
          </div>
        </div>
      </div>
      <div className={classes.item}>
        <h3 className={classes.title + ' s-text-36'}>Вебинары</h3>
        <div className={classes.desc + ' s-text-24'}>Онлайн-созвоны с участниками в Skype. Вместе разбираем теорию, а затем делаем короткие рисовальные упражнения.</div>
      </div>
    </div>
  );
}

function renderItem(props: ICourseData['faq'][number]) {
  return (
    <Animated.Scroll>
      {(id, className) => (
        <div className={cx({ item: true }, className)} id={id}>
          <div className={classes.itemQuestion + ' s-text-24'}><Text text={props.question}/></div>
          <div className={classes.itemAnswer + ' s-text-18'}><Text text={props.answer}/></div>
        </div>
      )}
    </Animated.Scroll>
  );
}

function renderItems(props: ICourseData['faq'] ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
