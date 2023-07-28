import { Fragment } from 'react';
import type { ICourseData } from 'types';
import classes from './Description.module.scss';
import classesItem from './Item.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { formatI18nT, i18n } from 'shared';

export default Description;

const t = formatI18nT('courseLanding.description');

interface IProps {
  data: ICourseData
}

function Description(props: IProps) {

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: '.revealUp',
    start: "top 100%",
    end: "bottom 20%",
    markers: true,
    onEnter: function () {
      gsap.fromTo(
        '.revealUp',
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.25,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto"
        }
      );
    },
  });
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title + ' s-text-56'}>{t('title')}</h2>
      <div className={classes.list}>
        {renderItems(props.data.description)}
      </div>
    </div>
  );
}

function renderItem(props: { question: string, answer: string }) {
  return (
    <div className={classesItem._ + ' revealUp'}>
      <div className={classesItem.questionWrapper}>
        <div className={classesItem.question + ' s-text-28'}>{props.question}</div>
      </div>
      <div className={classesItem.answear + ' s-text-24'}>{props.answer}</div>
    </div>
  );
}

function renderItems(props: Array<{ question: string, answer: string }> ) {
  return props.map((d, index) => (<Fragment key={index}>{renderItem(d)}</Fragment>));
}
