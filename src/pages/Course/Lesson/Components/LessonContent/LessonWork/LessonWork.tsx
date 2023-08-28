import { formatI18nT } from 'shared';

import Article from 'ui/Article/Article';

import classes from './LessonWork.module.scss';

import { IHomeworkData } from 'types';

export default LessonWork;

interface IProps {
  homework: IHomeworkData
}

const t = formatI18nT('courseLesson.homework');

function LessonWork(props: IProps) {
  return (
    <div className={classes._}>
      <Article.Title data={{ type: 'title', title: t('title') }}/>
      {props.homework.text &&  <Article.Text data={{ type: 'text', text: props.homework.text}}/>}
      {props.homework.reference && <Article.Text data={{type: 'text', text: props.homework.reference}}/>}
      {props.homework.images && <Article.Gallery data={props.homework.images}/>}
    </div>
  );
}
