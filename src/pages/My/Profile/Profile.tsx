import { DrawFreeCard } from 'assets/images';
import classesCourseCard from './CourseCard.module.scss';
import classes from './Profile.module.scss';
import type { IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';
import { ICourseData } from 'types';
import { addDays } from 'utils';


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
        <a className={classesCourseCard.titleLink + ' s-hoverable'} href='lessons.html' target='_blank'>
          <div className={classesCourseCard.title}>{props.title}</div>
          <div className={classesCourseCard.date + ' s-text-24'}>{formatEndDate(props.endDate)}</div>
        </a>
        <div className={classesCourseCard.cover}><img src={DrawFreeCard} alt='' decoding='async'/></div>
      </div>
    </div>
  );
}

function formatEndDate(endDate: Date) {
  const endDateOfAccess = addDays(endDate, 14);
  const endDateStr = endDateOfAccess.toLocaleDateString(
    ['ru-RU'],
    { month: 'long', day: 'numeric' }
  );

  return `${t('profile.endDate')}${endDateStr}`;
}