import { formatI18nT } from 'shared';

import Article from 'ui/Article/Article';

import classes from './LessonReview.module.scss';

import { IHomeworkData } from 'types';

export default LessonReview;

interface IProps {
  homework: IHomeworkData
}

const t = formatI18nT('courseLesson.review');

function LessonReview(props: IProps) {
  return (
    <div className={classes._}>
      <Article.Title data={{ type: 'title', title: t('title') }}/>
      {props.homework.review?.length && <Article blocks={props.homework.review}/>}
    </div>
  );
}
