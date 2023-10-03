import { DrawFreeCard } from 'assets/images';
import classesCourseCard from './CourseCard.module.scss';
import classes from './Profile.module.scss';
import { IUserData } from 'types';
import { formatI18nT } from 'shared';
import { Fragment } from 'react';
import { ICourseData } from 'types';


const t = formatI18nT('my');

export default Profile;

interface IProps {
  user: IUserData
  data: ICourseData
}

function Profile(props: IProps) {
  return (
    <div className='Profile'>
      <div className={classes.courseGroup}>
        <div className={classes.courseGroupTitle + ' s-text-21-uppercase'}>{t('profile.courseGroupTitle')}</div>
          {renderCourseCard(props.data)}
      </div>
    </div>
  );
}

// function renderCourseGroup() {
//   return props.map((d, index) => (<Fragment key={index}>{renderCourseCard(d)}</Fragment>));
// }

function renderCourseCard (props: ICourseData) {
  return (
    <div className={classesCourseCard.item}>
      <div className={classesCourseCard.info}>
        <a className={classesCourseCard.titleLink + ' s-text-21-uppercase'} href='lessons.html' target='_blank'>
          <span className='inline-link-text'>Как рисовать свободно</span>
        </a>
        <div className={classesCourseCard.cover}><img src={DrawFreeCard} alt='' decoding='async'/></div>
        <div className={classesCourseCard.date + ' s-text-21-uppercase'}>
          <span>доступ до 5 мая 2023 года</span>
          {/* <a href='#'><span className='inline-link-text'>продлить</span><span className='inline-link-arrow'>→</span></a> */}
        </div>
      </div>
    </div>
  );
}