import type { ICourseData } from 'types';
import classes from './Description.module.scss';

import classNames from 'classnames/bind';
import { formatI18nT } from 'shared';
import Animated from 'ui/Animated';

import Item from './Item/Item';

export default Description;

const t = formatI18nT('courseLanding.description');
const cx = classNames.bind(classes);

interface IProps {
  data: ICourseData
}

function Description(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <Animated.Scroll>
        {(id, className) => (<h2 className={cx({ title: true }, className) + ' s-text-56'} id={id}>{t('title')}</h2>)}
      </Animated.Scroll>
      <div className={classes.list}>
        {renderItems(props.data.description)}
      </div>
    </div>
  );
}

function renderItems(props: Array<{ question: string, answer: string }> ) {
  return props.map((d, index) => (<Item key={index} {...d}/>));
}
