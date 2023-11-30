import { formatI18nT } from 'shared';

import Article from 'ui/Article/Article';

import classes from './LessonWork.module.scss';

import type { IArticleTextBlock, IHomeworkDataWPopulate, TText } from 'types';
import { useMemo } from 'react';

export default LessonWork;

interface IProps {
  homework: IHomeworkDataWPopulate
}

const t = formatI18nT('courseLesson.homework');

function LessonWork(props: IProps) {
  const homework = props.homework.homework;
  const descriptionText = useMemo(() => {
    if (!homework.description) {
      return undefined;
    }

    const text: TText[] = homework.description
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => ({ tag: 'p', content: line }));
    return text;
  }, [homework.description]);

  return (
    <div className={classes._}>
      <Article.Title data={{ type: 'title', title: t('title') }}/>
      {descriptionText && <Article.Text data={{ type: 'text', text: descriptionText }}/>}
        {homework.externalHomeworkLink && <Article.Text data={
          {
            type: 'text',
            text: [
              {
                tag: 'a',
                content: `${homework.externalHomeworkLink}`,
                props: { className: 'link', target: "_blank", to: `${homework.externalHomeworkLink}` },
              }
            ]
          }
        }
      />}
      {homework.images && <Article.Gallery data={homework.images} galleryHeightPx={450}/>}
    </div>
  );
}
