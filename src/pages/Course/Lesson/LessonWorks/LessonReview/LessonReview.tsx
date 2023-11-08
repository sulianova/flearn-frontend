import { formatI18nT } from 'shared';

import Article from 'ui/Article/Article';

import classes from './LessonReview.module.scss';

import type { IHomeworkDataWPopulate } from 'types';

export default LessonReview;

interface IProps {
  homework: IHomeworkDataWPopulate
}

const t = formatI18nT('courseLesson.review');

function LessonReview(props: IProps) {
  const homework = props.homework.homework;

  return (
    <div className={classes._}>
      <Article.Title data={{ type: 'title', title: t('title') }}/>
      {homework.review?.length && <Article blocks={homework.review}/>}
    </div>
  );
}
