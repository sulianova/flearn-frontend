import classNames from 'classnames/bind';
import classesInputField from './InputField.module.scss';
import classes from './Settings.module.scss';

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);

export default function Settings() {
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
            />
          </div>
          <div className={classesInputField._}>
            <label className={classesInputField.label + ' s-text-21'} htmlFor='name'>Имя и фамилия</label>
            <input className={cx2({ input: true, isDisabled: false }) + ' s-text-21'} id='name' name='name' type='text' placeholder='Имя и фамилия'/>
          </div>
          <div className={classesInputField._}>
            <label className={classesInputField.label + ' s-text-21'} htmlFor='phone'>Телефон</label>
            <input className={cx2({ input: true, isDisabled: false }) + ' s-text-21'} id='phone' name='phone' type='tel' placeholder='+79998888888'/>
          </div>
        </form>
      </div>
      <div className={cx({ block: true, isBig: true })}>
        <div className={classes.logoutBtn}><a className='inline-link s-text-21-uppercase'><span className='inline-link-text'>Выйти из профиля →</span></a></div>
      </div>
    </div>

  );
}
