import classNames from 'classnames/bind';
import { useState } from 'react';

import { dataService } from 'services';
import Store from 'store';
import { fetchUser, logout } from 'store/actions/sagas';

import Link from 'ui/Link/Link';
import classesInputField from './InputField.module.scss';
import classes from './Settings.module.scss';

import type { IUserData } from 'services/user.service';
import { URLSections } from 'types';

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);

interface IProps {
  user: IUserData
}

export default function Settings(props: IProps) {
  const [localDisplayName, setLocalDisplayName] = useState<string>(props.user.displayName ?? '');

  return (
    <div className={classes._}>
      <div className={cx({ block: true, isBig: true })}>
        <div className={classes.blockTitle + ' s-text-21-uppercase'}>Аккаунт</div>
        <form className={classes.blockForm} method='post'>
          <div className={classesInputField._}>
            <label className={classesInputField.label + ' s-text-21'} htmlFor='email'>Почта</label>
            <input
              className={cx2({ input: true, isDisabled: true }) + ' s-text-21'}
              id='email'
              name='email'
              readOnly
              type='email'
              placeholder='email@email.com'
              value={props.user.email}
            />
          </div>
          <div className={classesInputField._}>
            <label className={classesInputField.label + ' s-text-21'} htmlFor='name'>Имя и фамилия</label>
            <input
              className={cx2({ input: true, isDisabled: false }) + ' s-text-21'}
              id='name'
              name='name'
              type='text'
              placeholder='Имя и фамилия'
              value={localDisplayName}
              onChange={e => setLocalDisplayName(e.target.value)}
              onBlur={() => handleUpdate(props.user.email, { displayName: localDisplayName })}
            />
          </div>
          <div className={classesInputField._}>
            <label className={classesInputField.label + ' s-text-21'} htmlFor='phone'>Телефон</label>
            <input
              className={cx2({ input: true, isDisabled: false }) + ' s-text-21'}
              id='phone'
              name='phone'
              type='tel'
              placeholder='+79998888888'
            />
          </div>
        </form>
      </div>
      <div className={cx({ block: true, isBig: true })}>
        <div className={classes.logoutBtn}>
          <Link
            className='inline-link s-text-21-uppercase'
            to={URLSections.FreeZone.index}
            onClick={() => Store.dispatch(logout({}))}
          >
            <span className='inline-link-text'>Выйти из профиля →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

async function handleUpdate(email: string, updateData: Partial<IUserData>) {
  await dataService.user.update(email, updateData);

  Store.dispatch(fetchUser({ payload: { email }}));
}
