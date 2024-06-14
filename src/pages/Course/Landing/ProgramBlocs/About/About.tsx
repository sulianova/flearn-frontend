import type { ICourseAbout, ICourseData } from 'services/course.service';

import Text from 'ui/Text/Text';
import Icon from 'ui/Icon/Icon';

import classes from './About.module.scss';

export default About;

interface IProps {
  type: ICourseData['type']
  about: ICourseAbout[]
}

function About({ about }: IProps) {
  return (
    <ul className={classes.__}>
      {about.map(({ icon, text }, index) => (
        <li className={classes.item} key={index}>
          <div className={classes.itemSvg}><Icon icon={icon}/></div>
          <div className={classes.itemText}><Text text={text}/></div>
        </li>
      ))}
    </ul>
  );
}
