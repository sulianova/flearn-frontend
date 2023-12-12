import { formatI18nT } from 'shared';

import Article from 'ui/Article/Article';

import classes from './LessonWork.module.scss';

import type { IArticleTextBlock, IHomeworkDataWPopulate, TText, IHomeworkImageData } from 'types';
import { useMemo } from 'react';
import { getFileExtension, isImage } from 'utils';

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

  const images = useMemo(() => homework.images.filter(image => isImage(image.originalName)), [homework.images]);
  const files = useMemo(() => homework.images.filter(image => !isImage(image.originalName)), [homework.images]);

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
      {Boolean(images.length) && <Article.Gallery data={images} galleryHeightPx={450}/>}
      {Boolean(files.length) && (
        <div className={classes.filesWrapper}>
          {files.map(file => (
            <a key={file.id} className='link' href={file.src}>{file.originalName}</a>
          ))}
        </div>
      )}
    </div>
  );
}
