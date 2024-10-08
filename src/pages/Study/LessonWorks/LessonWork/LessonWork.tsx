// import { formatI18nT } from 'shared';

// import Article from 'ui/Article/Article';
// import type { TText } from 'ui/Text/Text';

// import classes from './LessonWork.module.scss';
// import { useMemo } from 'react';
// import { isImage } from 'utils';
// import { IHomeworkDataWPopulate } from 'services/homework.service';

// export default LessonWork;

// interface IProps {
//   homework: IHomeworkDataWPopulate
// }

// const t = formatI18nT('courseLesson.homework');

// function LessonWork(props: IProps) {
//   const homework = props.homework.homework;
//   const descriptionText = useMemo(() => {
//     if (!homework.description) {
//       return undefined;
//     }

//     const text: TText = homework.description
//       .split('\n')
//       .map(line => line.trim())
//       .filter(Boolean)
//       .map(line => ({ tag: 'p', content: line }));
//     return text;
//   }, [homework.description]);

//   // TODD: move files to different place in homework object
//   const images = useMemo(() => homework.images.filter(image => isImage(image.originalName)), [homework.images]);
//   const files = useMemo(() => homework.images.filter(image => !isImage(image.originalName)), [homework.images]);

//   return (
//     <div className={classes._}>
//       <Article.Title data={{ type: 'title', title: t('title') }}/>
//       {descriptionText && <Article.Text data={{ type: 'text', text: descriptionText }}/>}
//         {homework.externalHomeworkLink && <Article.Text data={
//           {
//             type: 'text',
//             text: [
//               {
//                 tag: 'a',
//                 content: `${homework.externalHomeworkLink}`,
//                 props: { className: 'link', target: "_blank", to: `${homework.externalHomeworkLink}` },
//               }
//             ]
//           }
//         }
//       />}
//       {Boolean(images.length) && <Article.Gallery images={images} maxHeightPx={450}/>}
//       {Boolean(files.length) && (
//         <Article.Factoid data={{
//           type: 'factoid',
//           factoid: files.map(file => ({
//             tag: 'a',
//             content: file.originalName,
//             props: {
//               to: file.src,
//               className: 'link',
//               target: '_blank',
//             },
//           })),
//         }}/>
//       )}
//     </div>
//   );
// }

export default () => null;
