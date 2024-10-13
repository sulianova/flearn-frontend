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
    <div className={cx({ wrapper: true, [`wrapper_${variant}`]: true })}>
      {
        type === EFooter.Big && (
          <div className={cx({ row: true, card: true })}>
            <div className={classes.logo}>
                <div className={classes.logo}>{i18n.t('logoLong')}</div>
            </div>
            <div className={classes.creators}>
              <Link className={classes.person} to={t('creatorDesign.link')}  target='_blank'>
                <span className={classes.person__title}>{t('creatorDesign.title')}</span>
                <span className={classes.person__name}>{t('creatorDesign.name')}</span>
              </Link>
              <Link className={classes.person} to={t('creatorFrontend.link')} target='_blank'>
                <span className={classes.person__title}>{t('creatorFrontend.title')}</span>
                <span className={classes.person__name}>{t('creatorFrontend.name')}</span>
              </Link>
            </div>
        </div>
        )
      }
      <div className={cx({ row: true, card: false })}>
        <div className={cx({ contacts: true, col: true })}>
          <p className={classes.copyright}>{t('copyright')}</p>
          <Link to={t('emailTo')} className='key-link' target='_blank'>{t('email')}</Link>
          <p>{t('emailComment')}</p>
        </div>
        <div className={cx({ documents: true, col: true })}>
          <Link to={URLSections.Static.Policy.index} className='s-hoverable' target='_blank'>{t('documentsPrivacyPolicy.title')}</Link>
          <Link to={URLSections.Static.Oferta.index} className='s-hoverable' target='_blank'>{t('documentsTermsOfUse.title')}</Link>
        </div>
        <div className={cx({ social: true, col: false })}>
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
      </div>
    </div>
  );
}
