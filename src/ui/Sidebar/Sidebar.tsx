import classes from './Sidebar.module.scss';
import Link from 'ui/Link/Link';
import Portfolio from 'assets/images/Svg/Portfolio';
import { useState } from 'react';
import LessonsPopup from 'components/LessonsPopup/LessonsPopup';

export default Sidebar;

function Sidebar() {
  const [lessonsPopupVisible, setLessonsPopupVisible] = useState(false);
  return (
    <>
      <div className={classes.__}>
        <aside className={classes.container}>
          <ul className={classes.items}>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
          </ul>
          <ul className={classes.items}>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
                <Link
                  className={classes.icon}
                >
                  <Portfolio/>
                </Link>
              </span>
            </li>
            <li className={classes.item}>
              <span className={classes.iconWrapper}>
               <div
                  className={classes.icon}
                  onClick={() => setLessonsPopupVisible(v => !v)}
                >
                  <Portfolio/>
                </div>
              </span>
            </li>
          </ul>
        </aside>
      </div>
      {lessonsPopupVisible && <LessonsPopup onClose={() => setLessonsPopupVisible(false)} courseId='someid'/>}
    </>
  );
}
