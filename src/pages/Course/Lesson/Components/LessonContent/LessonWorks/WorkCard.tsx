import UserImage from 'assets/images/Svg/UserImage';
import classNames from 'classnames/bind';
import { IHomeworkData } from 'types';
import Img from 'ui/Img/Img';
import classes from './WorkCard.module.scss';

const cx = classNames.bind(classes);

export default WorkCard;

interface IProps {
  handleClick: (u: { id: string, displayName: string } | null) => void
  homework: IHomeworkData
}

function WorkCard({ handleClick, homework}: IProps) {
  return (
      <div className={cx({ _: true, hidden: false })} onClick={() => handleClick({ id: 'sonia', displayName: 'Sofiia ulianova' })}>
        <div className={classes.preview}>
          {homework.images?.[0] && (<Img alt={homework.images[0].imageAlt} src={homework.images[0].imageSrc}/>)}
          <div className={classes.overlay}/>
        </div>
        <div className={classes.user}>
          <div className={classes.userImage}>
            <UserImage/>
          </div>
          <div className={classes.userName + ' s-text-16'}>Лиза Смирнова</div>
        </div>
      </div>
  );
}
