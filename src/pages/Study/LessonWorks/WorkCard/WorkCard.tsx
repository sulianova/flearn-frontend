// import classNames from 'classnames/bind';
// import { useMemo } from 'react';
// import { useParams } from 'react-router';

// import { URLSections } from 'router';
// import { isImage } from 'utils';

// import Icon from 'ui/Icon/Icon';
// import Img from 'ui/Img/Img';
// import Link from 'ui/Link/Link';

// import classes from './WorkCard.module.scss';
// import { IHomeworkDataWPopulate, IHomeworkImageData } from 'services/homework.service';

// const cx = classNames.bind(classes);

// export default WorkCard;

// interface IProps {
//   homework: IHomeworkDataWPopulate
// }

// function WorkCard({ homework }: IProps) {
//   const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
//   const user = homework.populate?.user;
//   const coverImage = useMemo(
//     () => homework.homework.images.filter(image => isImage(image.originalName))[0] as IHomeworkImageData | undefined,
//   [homework.homework.images]);

//   return (
//       <div className={cx({ _: true, hidden: false })}>
//         <Link
//           block
//           className={classes.preview}
//           to={URLSections.Study.Results.to({ courseId, lessonId, params: { userId: user?.id }})}
//         >
//           <div className={classes.overlay}/>
//         </Link>
//         <div className={classes.user}>
//           <div className={classes.userImage}>
//             <Icon icon='User'/>
//           </div>
//           <div className={classes.userName}>{user?.displayName}</div>
//         </div>
//       </div>
//   );
// }

export default () => null;
