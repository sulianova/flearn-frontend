import { formatI18nT } from 'shared';

import Article from 'ui/Article/Article';

import classes from './LessonWork.module.scss';

import type { IHomeworkDataWPopulate } from 'types';

export default LessonWork;

interface IProps {
  homework: IHomeworkDataWPopulate
}

const t = formatI18nT('courseLesson.homework');

function LessonWork(props: IProps) {
  const homework = props.homework.homework;
  return (
    <div className={classes._}>
      <Article.Title data={{ type: 'title', title: t('title') }}/>
      {homework.text &&  <Article.Text data={{ type: 'text', text: homework.text}}/>}
      {homework.reference && <Article.Text data={{type: 'text', text: homework.reference}}/>}
      {homework.images && <Article.Gallery data={homework.images}/>}
    </div>
  );
}
