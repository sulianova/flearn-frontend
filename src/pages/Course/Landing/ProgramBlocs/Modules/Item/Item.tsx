import classNames from 'classnames/bind';
import { useState } from 'react';

import type { ICourseModule } from 'services/course.service';
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

interface IProps {
  index: number
  module: ICourseModule
}

function Item(props: Readonly<IProps>) {
  const { index, module } = props;
  const isMobile = useIsMobile();
  const [opened, setOpened] = useState(false);

  const tagsListNode = module.tags && module.tags.length && (
    <ul className={classes.tags}>
      {module.tags.map(tag => <li className={classes.tag}>{tag}</li>)}
    </ul>
  );

  return (
    <div className={classes.item} style={{ '--items-in-row': 1 } as React.CSSProperties}>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ itemCard: true }, className)} id={id}>
            <div className={classes.bullet}>{index}</div>
            <div className={classes.meta}>
              <Text text={module.meta}/>
              {index === 0 && (
                <div className={classes.badge}>
                  <Icon icon='Lightning'/>
                  Бесплатно
                </div>
              )}
            </div>
            <div className={classes.title}>
              <Text text={module.title}/>
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
                {module.subsection && module.subsection.length && (
                  <div className={classes.subsections}>
                    {module.subsection.map(subsection => <Subsection subsection={subsection}/>)}
                  </div>
                )}
                {module.subsectionDescription && (
                  <div className={classes.projects}>
                    <div className={classes.projectsDescription}>{module.subsectionDescription}</div>
                  </div>
                )}
              </div>
            </div>
            {/* {props.content && Boolean(!Array.isArray(props.content) || props.content.length) && <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>} */}
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}
