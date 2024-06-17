import classNames from 'classnames/bind';
import { useState } from 'react';

import { useIsMobile } from 'hooks';
import { ICourseModule } from 'services/course.service';

import Icon from 'ui/Icon/Icon';
import Text from 'ui/Text/Text';

import classes from './Subsection.module.scss';

export default Subsection;

const cx = classNames.bind(classes);

interface IProps {
 subsection: NonNullable<ICourseModule['subsection']>[number]
 initiallyOpened: boolean
}

function Subsection({ subsection: { subsectionTitle, subsectionText }, initiallyOpened }: IProps) {
  const isMobile = useIsMobile();
  const [opened, setOpened] = useState(initiallyOpened);

  return (
    <div className={classes.subsection}>
      <h3 className={classes.subsectionTitle}>
        {subsectionTitle}
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
        <div className={classes.subsectionDescription}>{subsectionText && <Text text={subsectionText}/>}</div>
      </div>
    </div>
  );
}
