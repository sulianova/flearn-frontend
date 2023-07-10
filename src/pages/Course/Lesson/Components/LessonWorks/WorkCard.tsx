import classes from './WorkCard.module.scss'
import classNames from 'classnames/bind'
import Image from './Image';

const cx = classNames.bind(classes);

export default WorkCard;

function WorkCard() {
  return (
      <a className={cx({ _: true, hidden: true })} href="homework-editor.html">
        <div className={classes.preview}>
          <Image/>
          <div className={classes.overlay}></div>
        </div>
        <div className={classes.user}>
          <div className={classes.userImage}>
            <svg className="svg-user" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 23C24 24 20.4183 24 16 24C11.5817 24 8 24 8 23C8 18.5817 11.5817 15 16 15C20.4183 15 24 18.5817 24 23Z" fill="#131313"></path>
              <ellipse cx="16" cy="9.88615" rx="4" ry="3.88615" fill="#131313"></ellipse>
            </svg>
          </div>
          <div className={classes.userName + " s-text-16"}>Лиза Смирнова</div>
        </div>
      </a>
  );
}