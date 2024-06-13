import { URLSections } from 'router';
import Link from 'ui/Link/Link';

import Instagram from 'assets/images/Svg/Instagram';
import Telegram from 'assets/images/Svg/Telegram';
import Tiktok from 'assets/images/Svg/Tiktok';
import Vk from 'assets/images/Svg/Vk';
import YandexZen from 'assets/images/Svg/YandexZen';
import Youtube from 'assets/images/Svg/Youtube';
import classNames from 'classnames/bind';
import { formatI18nT, i18n } from 'shared';
import classes from './Footer.module.scss';

const t = formatI18nT('footer');
const cx = classNames.bind(classes);

export default Footer;

export enum EFooter {
  Default = 'default',
  Big = 'big',
}

interface IProps {
  type?:  EFooter
}

function Footer({ type =  EFooter.Default }: IProps) {
  return (
    <div className={classes._}>
      {
        type === EFooter.Big && (
          <div className={cx({ row: true, card: true })}>
            <div className={cx({ logo: true, col: true })}>
                <div className={classes.logoLong}>{i18n.t('logoLong')}</div>
            </div>
            <div className={cx({ creator: true, col: true })}>
              <Link to={t('creatorDesign.link')}  target='_blank'>
                <span className={classes.creatorTitle}>{t('creatorDesign.title')}</span>
                <span className={classes.creatorName + ' inline-link'}>{t('creatorDesign.name')}</span>
              </Link>
              <Link to={t('creatorFrontend.link')} target='_blank'>
                <span className={classes.creatorTitle}>{t('creatorFrontend.title')}</span>
                <span className={classes.creatorName + ' inline-link'}>{t('creatorFrontend.name')}</span>
              </Link>
            </div>
        </div>
        )
      }
      <div className={cx({ row: true, card: false })}>
        <div className={cx({ copyright: true, col: true })}>
          <p className={classes.colItem}>{t('copyright')}</p>
        </div>
        <div className={cx({ contacts: true, col: true })}>
          <Link to={t('emailTo')} className={classes.colItem + ' key-link'} target='_blank'>{t('email')}</Link>
          <p className={classes.colItem}>{t('emailComment')}</p>
        </div>
        <div className={cx({ documents: true, col: true })}>
          <Link to={URLSections.Static.Policy.index} className={classes.colItem + ' nav-link'} target='_blank'>{t('documentsPrivacyPolicy.title')}</Link>
          <Link to={URLSections.Static.Oferta.index} className={classes.colItem + ' nav-link'} target='_blank'>{t('documentsTermsOfUse.title')}</Link>
        </div>
        <div className={cx({ social: true, col: false })}>
          <div className={classes.socialLink}>
            <Link to={t('socialInstagram.link')} target='_blank'>{<Instagram/>}</Link>
          </div>
          <div className={classes.socialLink}>
            <Link to={t('socialTiktok.link')} target='_blank'>{<Tiktok/>}</Link>
          </div>
          <div className={classes.socialLink}>
            <Link to={t('socialTelegram.link')} target='_blank'>{<Telegram/>}</Link>
          </div>
          <div className={classes.socialLink}>
            <Link to={t('socialVk.link')} target='_blank'>{<Vk/>}</Link>
          </div>
          <div className={classes.socialLink}>
            <Link to={t('socialYoutube.link')} target='_blank'>{<Youtube/>}</Link>
          </div>
          <div className={classes.socialLink}>
            <Link to={t('socialDzen.link')} target='_blank'>{<YandexZen/>}</Link>
          </div>
      </div>
      </div>
    </div>
  );
}
