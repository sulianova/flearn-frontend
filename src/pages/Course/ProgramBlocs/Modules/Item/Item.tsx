import classNames from 'classnames/bind';
import { useState } from 'react';

import type { ICourseModule } from 'services/course.service';
import { formatI18nT } from 'shared';

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
  const alwaysOpened = index === 0;
  const [opened, setOpened] = useState(false);

  const tagsListNode = module.tags && module.tags.length && (
    <ul className={classes.tags}>
      {module.tags.map(tag => <li className={classes.tag}>{tag}</li>)}
    </ul>
  );

  const itemClasses = cx({
    itemCard: true,
    itemCardHoverable: Boolean(module.subsectionDescription && module.subsection && module.subsection.length),
  });

  return (
    <div className={classes.item} style={{ '--items-in-row': 1 } as React.CSSProperties}>
      <div className={itemClasses}>
        <div className={classes.bullet}>{index}</div>
        <div className={classes.meta}>
          <Text text={module.meta}/>
          {index === 0 && (
            <div className={classes.badge}>
              Бесплатно
              <Icon icon='Lightning'/>
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
        </div>
        <div className={classes.description}>{module.description && <Text text={module.description}/>}</div>
        {!isMobile && tagsListNode}
        <div className={cx({ slideDown: true, slideDownClosed: alwaysOpened ? !alwaysOpened : !opened })}>
          {isMobile && tagsListNode}
          {module.subsectionDescription && module.subsection && module.subsection.length && (
            <div className={classes.additionalInfo}>
              <div className={classes.subsections}>
                {module.subsection.map((subsection, i) => <Subsection key={i} subsection={subsection} initiallyOpened={i === 0}/>)}
              </div>
              <div className={classes.projects}>
                <div className={classes.projectsDescription}>{module.subsectionDescription}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
