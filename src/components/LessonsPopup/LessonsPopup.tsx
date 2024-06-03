import Popup from 'ui/Popup/Popup';
import classes from './LessonsPopup.module.scss';
import ModalCross from 'assets/images/Svg/ModalCross';

interface IProps {
  courseId: string
  onClose: () => void
}

export default function LessonsPopup(props: IProps) {
  return (
    <Popup>
      <div className={classes.__}>
        <div className={classes.close} onClick={props.onClose}>
          <ModalCross/>
        </div>
        <div className={classes.body}>
          <div>Lesson 1</div>
          <div>Lesson2</div>
        </div>
      </div>
    </Popup>
  );
}
