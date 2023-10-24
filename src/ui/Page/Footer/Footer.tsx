import { URLSections } from 'types';
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
              <div className={'s-text-36'}>{i18n.t('logoLong')}</div>
          </div>
          <div className={cx({ nav: true, col: true })}>
              {/* <Link to={URLSections.Catalogue.index} className={classes.colItem + ' s-text-18 link'} target='_blank'>{t('referencesCatalogue')}</Link>
              <Link to={URLSections.FreeZone.index} className={classes.colItem + ' s-text-18 link'} target='_blank'>{t('referencesBooks')}</Link>
              <Link to={URLSections.FreeZone.index} className={classes.colItem + ' s-text-18 link'} target='_blank'>{t('referencesFreeZone')}</Link>
              <Link to={URLSections.FreeZone.index} className={classes.colItem + ' s-text-18 link'} target='_blank'>{t('referencesReviews')}</Link> */}
          </div>
          <div className={cx({ creator: true, col: true })}>
            <Link to={t('creatorDesign.link')}  target='_blank'>
              <span className='s-text-18'>{t('creatorDesign.title')}</span>
              <span className={classes.creatorName + ' s-text-21-uppercase inline-link'}>{t('creatorDesign.name')}</span>
            </Link>
            <Link to={t('creatorFrontend.link')} target='_blank'>
              <span className='s-text-18'>{t('creatorFrontend.title')}</span>
              <span className={classes.creatorName + ' s-text-21-uppercase inline-link'}>{t('creatorFrontend.name')}</span>
            </Link>
          </div>
        </div>
        )
      }
      <div className={cx({ row: true, card: false })}>
        <div className={cx({ copyright: true, col: true })}>
          <p className={classes.colItem + ' s-text-16-18'}>{t('copyright')}</p>
        </div>
        <div className={cx({ contacts: true, col: true })}>
          <Link to={t('emailTo')} className={'s-text-16-18 key-link'} target='_blank'>{t('email')}</Link>
          <p className={'s-text-16-18'}>{t('emailComment')}</p>
        </div>
        <div className={cx({ documents: true, col: true })}>
          <Link to={URLSections.Static.Policy.index} className={'s-text-16-18 link'} target='_blank'>{t('documentsPrivacyPolicy.title')}</Link>
          <Link to={URLSections.Static.Oferta.index} className={'s-text-16-18 link'} target='_blank'>{t('documentsTermsOfUse.title')}</Link>
        </div>
        <div className={cx({ social: true, col: false })}>
          {/* <div className={classes.socialLink}>
            <Link to={t('socialInstagram.link')} target='_blank'>{<Instagram/>}</Link>
          </div> */}
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
