import classNames from 'classnames/bind';
import { useState } from 'react';

import Icon from 'ui/Icon/Icon';

import classes from './Subsection.module.scss';
import { useIsMobile } from 'hooks';

export default Subsection;

const cx = classNames.bind(classes);

function Subsection(props: {}) {
  const isMobile = useIsMobile();
  const [opened, setOpened] = useState(false);

  return (
    <div className={classes.subsection}>
      <h3 className={classes.subsectionTitle}>
        Упражнения, чтобы разрисоваться
        <button
          className={classes.hiddenButton}
          type="button"
          onClick={() => setOpened(o => !o)}
        />
        <div className={cx({ subsectionArrow: true, subsectionArrowOpened: opened })}>
          <Icon icon='SubsectionArrow'/>
        </div>
      </h3>
      <div className={cx({ subsectionSlideDown: true, subsectionClosed: !opened && isMobile })}>
        <div className={classes.subsectionDescription}>Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается.</div>
      </div>
    </div>
  );
}
