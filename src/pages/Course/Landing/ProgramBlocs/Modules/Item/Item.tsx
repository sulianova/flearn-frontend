import classNames from 'classnames/bind';
import { useState } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './Item.module.scss';
import { useIsMobile } from 'hooks';
import Subsection from './Subsection/Subsection';

export default Item;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

function Item(props: NonNullable<ICourseData['modules']>[number]) {
  const isMobile = useIsMobile();
  const [opened, setOpened] = useState(false);

  const tagsListNode = (
    <ul className={classes.tags}>
      <li className={classes.tag}>Линия</li>
      <li className={classes.tag}>Быстрые наброски</li>
      <li className={classes.tag}>Контраст</li>
      <li className={classes.tag }>Выделение главного</li>
    </ul>
  );

  return (
    <div className={classes.item} style={{ '--items-in-row': 1 } as React.CSSProperties}>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ itemCard: true }, className)} id={id}>
            <div className={classes.bullet}>2</div>
            <div className={classes.meta}>
              <Text text={props.meta}/>
              <div className={classes.badge}>
                <Icon icon='Lightning'/>
                Бесплатно
              </div>
            </div>
            <div className={classes.title}>
              <Text text={props.title}/>
              <button
                className={classes.hiddenButton}
                type="button"
                onClick={() => setOpened(o => !o)}
              />
            {!isMobile && tagsListNode}
            </div>
            {/* <div className={classes.description}>Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается.</div> */}
            <div className={cx({ slideDown: true, slideDownClosed: !opened })}>
              {isMobile && tagsListNode}
              <div className={classes.additionalInfo}>
                <div className={classes.subsections}>
                  <Subsection/>
                  <Subsection/>
                </div>
                <div className={classes.projects}>
                  <div className={classes.projectsDescription}>Сделаете 5-6 стикеров для Telegram.</div>
                </div>
              </div>
            </div>
            {/* {props.content && Boolean(!Array.isArray(props.content) || props.content.length) && <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>} */}
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}
