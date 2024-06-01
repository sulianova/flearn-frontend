import classes from './Sidebar.module.scss';
import Link from 'ui/Link/Link';
import Portfolio from 'assets/images/Svg/Portfolio';

export default Sidebar;

function Sidebar() {
  return (
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
      </aside>
    </div>
  );
}