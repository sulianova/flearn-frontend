import classNames from 'classnames/bind';

import { URLSections } from 'router';
import { formatI18nT, i18n } from 'shared';

import Link from 'ui/Link/Link';
import Icon from 'ui/Icon/Icon';

import classes from './Footer.module.scss';
import { EPageVariant } from '../Page';

const t = formatI18nT('footer');
const cx = classNames.bind(classes);

export default Footer;

export enum EFooter {
  Default = 'default',
  Big = 'big',
}

interface IProps {
  variant: EPageVariant
  type?:  EFooter
}

function Footer({ variant, type =  EFooter.Default }: IProps) {

  return (
    <div className={cx({ wrapper: true })}>
      <div className={cx({ card: true })}>
        <div className={classes.content}>
          <div className={classes.creators}>
            <Link className={classes.person} to={t('designer.link')}  target='_blank'>
              <span className={classes.person__title}>{t('designer.title')}</span>
              <span className={classes.person__name}>{t('designer.name')}</span>
            </Link>
            <Link className={classes.person} to={t('developer.link')} target='_blank'>
              <span className={classes.person__title}>{t('developer.title')}</span>
              <span className={classes.person__name}>{t('developer.name')}</span>
            </Link>
          </div>
          <div className={cx({ documents: true })}>
            <p className={classes.copyright}>{t('copyright')}</p>
            <Link to={URLSections.Static.Policy.index} target='_blank'>{t('documentsPrivacyPolicy.title')}</Link>
            <Link to={URLSections.Static.Oferta.index} target='_blank'>{t('documentsTermsOfUse.title')}</Link>
          </div>
        </div>
        <div className={cx({ social: true })}>
          <Link
            className={cx({ social__link: true })}
            to={t('socialTelegram.link')}
            target='_blank'>
              <Icon icon='Telegram'/>
            </Link>
          <Link 
            className={cx({ social__link: true })}
            to={t('socialTiktok.link')}
            target='_blank'>
              <Icon icon='Tiktok'/>
          </Link>
          <Link 
            className={cx({ social__link: true })}
            to={t('socialVk.link')}
            target='_blank'>
              <Icon icon='Vk'/>
          </Link>
        </div>
        <div className={cx({ contacts: true })}>
          <Link to={t('emailTo')} className='key-link' target='_blank'>{t('email')}</Link>
          <p>{t('emailComment')}</p>
        </div>
      </div>
    </div>
  );
}
