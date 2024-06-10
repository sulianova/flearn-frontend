import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { URLSections } from 'router';
import { isImage } from 'utils';

import UserImage from 'assets/images/Svg/UserImage';
import Pattern from 'assets/images/Svg/Pattern';
import Img from 'ui/Img/Img';
import Link from 'ui/Link/Link';

import type { IHomeworkDataWPopulate, IHomeworkImageData } from 'types';

import classes from './WorkCard.module.scss';

const cx = classNames.bind(classes);

export default WorkCard;

interface IProps {
  homework: IHomeworkDataWPopulate
}

function WorkCard({ homework }: IProps) {
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const user = homework.populate?.user;
  const coverImage = useMemo(
    () => homework.homework.images.filter(image => isImage(image.originalName))[0] as IHomeworkImageData | undefined,
  [homework.homework.images]);

  return (
      <div className={cx({ _: true, hidden: false })}>
        <Link
          block
          className={classes.preview}
          to={URLSections.Course.Lesson.Results.to({ courseId, lessonId, params: { userId: user?.id }})}
        >
          {coverImage ? (
            <Img
              src={coverImage.src}
              alt={coverImage.alt}
              placeholder={<Pattern/>}
            />
          ) : (
            <Pattern/>
          )}
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
