import UserImage from 'assets/images/Svg/UserImage';
import classNames from 'classnames/bind';
import { IHomeworkDataWPopulate } from 'types';
import classes from './WorkCard.module.scss';

const cx = classNames.bind(classes);

export default WorkCard;

interface IProps {
  handleClick: (u: { id: string, displayName: string } | null) => void
  homework: IHomeworkDataWPopulate
}

function WorkCard(props: IProps) {
  const { handleClick, homework: data } = props;
  const user = data.populate!.user!;

  return (
      <div className={cx({ _: true, hidden: false })}>
        <div className={classes.preview} onClick={() => handleClick({ id: user.id, displayName: user.displayName ?? '' })}>
          {data.homework.images?.[0] && (<img alt={data.homework.images[0].alt} src={data.homework.images[0].src}/>)}
          <div className={classes.overlay}/>
        </div>
        <div className={classes.user}>
          <div className={classes.userImage}>
            <UserImage/>
          </div>
          <div className={classes.userName + ' s-text-16'}>{user.displayName}</div>
        </div>
      </div>
  );
}
