import classnames from 'classnames/bind';
import { useNavigate } from 'react-router';

import { authService } from 'services';
import { IUserData } from 'services/user.service';
import { URLSections } from 'router';
import Icon from 'ui/Icon/Icon';

import classes from './UserPopup.module.scss';

const cx = classnames.bind(classes);

interface IProps {
  user: IUserData
  close: () => void
}

export default function UserPopup({ user, close }: IProps) {
  const navigate = useNavigate();

  return (
    <div className={cx({ popup: true, animated: true, inverseAnimated: true, open: true })}>
      <div className={classes.items}>
        {/* <div className={cx({ item: true, itemHoverable: true })}>
          <div className={classes.itemTitle}>
            <div className={classes.withIcon}>
              <Icon icon='Portfolio' />
              <span>Анкета</span>
            </div>
          </div>
        </div> */}
        <div className={classes.item}>
          <div className={classes.userName}>{user.email}</div>
        </div>
        <div className={cx({ item: true, itemHoverable: true })}>
          <div
            className={classes.itemTitle}
            onClick={() => authService.logout().then(() => navigate(URLSections.Home.index))}
          >
            Выйти из профиля
          </div>
        </div>
      </div>
    </div>
  );
}

