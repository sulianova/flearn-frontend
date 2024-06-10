import classnames from 'classnames/bind';
import { useNavigate } from 'react-router';

import { authService } from 'services/auth.service';
import { IUserData } from 'services/user.service';
import { URLSections } from 'router';

import Portfolio from 'assets/images/Svg/Portfolio';

import classes from './UserPopup.module.scss';

const cx = classnames.bind(classes);

interface IProps {
  user: IUserData
  close: () => void
}

export default function UserPopup({ user, close }: IProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.overlay} onClick={close}></div>
      <div className={cx({ popup: true, animated: true, inverseAnimated: true, open: true })}>
        <div className={classes.itemsGroup}>
         <div className={classes.item}>
          <div className={classes.itemTitle + ' s-text-16'}>{user.displayName}</div>
          <div className={classes.itemSubtitle + ' s-text-14'}>{user.email}</div>
          </div>
        </div>
        <div className={classes.itemsGroup}>
          <div className={cx({ item: true, itemHoverable: true })}>
            <div className={classes.itemTitle + ' s-text-16'}>
              <div className={classes.withIcon}>
                <Portfolio/>
                <span>Анкета</span>
              </div>
            </div>
          </div>
          <div className={cx({ item: true, itemHoverable: true }) + ' s-text-16'}>
            <div
              className={classes.itemTitle}
              onClick={() => authService.logout().then(() => navigate(URLSections.Home.index))}
            >
              Выйти из профиля
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
