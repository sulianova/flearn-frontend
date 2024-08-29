import type { ICourseData, ICourseModule } from 'services/course.service';
import { formatI18nT } from 'shared';

import classes from './Modules.module.scss';
import Item from './Item/Item';

export default Modules;

const t = formatI18nT('courseLanding.modules');

interface IProps {
  modules: ICourseModule[]
}

function Modules(props: IProps) {
  const { modules } = props;
  return (
      <div className={classes.wrapper}>
        <div className={classes.header}>{t('title')}</div>
        <div className={classes.list}>
          {modules.map((module, index) => <Item key={index} index={index} module={module}/>)}
        </div>
      </div>
  );
}
