import classNames from 'classnames/bind';
import { formatI18nT, i18n } from 'shared';

import classes from './DecisionForm.module.scss';
import classesInput from './InputField.module.scss';

import type { ICourseData } from 'types';

export default DecisionForm;

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInput);

interface IProps {
  data: ICourseData
}

const t = formatI18nT('course.landing.form');

function DecisionForm(props: IProps) {
  return (
    <div className={classes.wrapper} id='decision-form'>
      <div className={cx({ block: true, blockDetails: true })}>
        <h1 className={classes.title + ' s-text-56'}>{t('title')}</h1>
        <div className={classes.credit}>
          <s className={classes.creditWas + ' s-text-24'}>{formatCredit(props.data.creditWas)} &#8381;</s>
          <div className={classes.creditPrice + ' s-text-88'}>{formatCredit(props.data.creditPrice)} &#8381;<span className={classes.discount + ' s-text-18'}>{formatCourseDiscount(props.data.discontAmount)}</span></div>
        </div>
        <div className={classes.courseName + ' s-text-18'}>{t('courseName', { courseName: props.data.title })}</div>
      </div>
      <div className={classes.block}>
        <h1 className={classes.subtitle + ' s-text-24'}>{t('subtitle')}</h1>
        <form className={classes.form} data-hs-cf-bound='true'>
          <div className={classes.inputWrap}>
            <input className={cx2({ input: true, dark: true }) + ' s-text-24'} id='name2' name='name2' placeholder='Имя' required type='text'/>
          </div>
          <div className={classes.inputWrap}>
            <label htmlFor='phone2'/>
            <input className={cx2({ input: true, dark: true }) + ' s-text-24'} id='phone2' name='name2' placeholder='+78888888888' required type='tel'/>
          </div>
          <div className={classes.inputWrap}>
            <input className={cx2({ input: true, dark: true }) + ' s-text-24'} id='email2' name='email2' placeholder='Email' required type='email'/>
          </div>
          <div className={classes.agreement}>
            <input className={classes.agreementCheckbox} type='checkbox' id='agreement-consult' defaultChecked/>
            <label htmlFor='agreement-consult'>
              <svg width='17' height='18' viewBox='0 0 17 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g id='checkmark' clip-path='url(#clip0_1024_2304)'>
                  <path d='M2 2.5L8.5 15.5L15 2.5' stroke='#707070' stroke-width='2' stroke-linecap='round'/>
                </g>
                <rect x='1' y='1.5' width='15' height='15' stroke='#707070' stroke-width='2'/>
                <defs>
                  <clipPath id='clip0_1024_2304'>
                    <rect y='0.5' width='17' height='17' fill='white'/>
                  </clipPath>
                </defs>
              </svg>
                <span className={classes.agreementText + ' s-text-18'}>
                  {t('agreement1')}&nbsp;<a href=''>{t('agreement2')}</a>
                </span>
            </label>
          </div>
          <button className={classes.submitButton + ' s-text-24'} type='button'><span>{i18n.t('sign up')}</span></button>
        </form>

      </div>
    </div>
  );
}

function formatCredit(credit: number) {
  const thousands = String(credit).slice(0, -3);
  return `${thousands} 000`;
}

function formatCourseDiscount(discontAmount: number) {
  return `-${discontAmount}%`;
}
