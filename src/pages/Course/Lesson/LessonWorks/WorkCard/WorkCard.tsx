import classNames from 'classnames/bind';
import { useParams } from 'react-router';

import UserImage from 'assets/images/Svg/UserImage';
import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';
import Image from 'assets/images/Svg/Image';
import Pattern from 'assets/images/Svg/Pattern';
import { formatI18nT } from 'shared';

import classes from './WorkCard.module.scss';

import { URLSections, type IHomeworkDataWPopulate, IHomeworkImageData } from 'types';

const cx = classNames.bind(classes);
const t = formatI18nT('courseLesson.works');

export default WorkCard;

interface IProps {
  homework: IHomeworkDataWPopulate
}

function WorkCard({ homework }: IProps) {
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const user = homework.populate?.user;
  const coverImage = homework.homework.images[0] as IHomeworkImageData | undefined;

  return (
      <div className={cx({ _: true, hidden: false})}>
        <Link
          block
          className={classes.preview}
          to={URLSections.Course.Lesson.Results.to({ courseId, lessonId, params: { userId: user?.id }})}
        >
          {/* <Img
            src={coverImage?.src ?? ''}
            alt={coverImage?.alt ?? ''}
          /> */}
          <Pattern/>
          <div className={classes.overlay}/>
        </Link>
        <div className={classes.user}>
          <div className={classes.userImage}>
            <UserImage/>
          </div>
          <div className={classes.userName + ' s-text-16'}>{user?.displayName}</div>
        </div>
      </div>
  );
}
