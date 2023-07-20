import { URLSections } from 'types';
import Link from 'ui/Link/Link';

import { formatI18nT, i18n } from 'shared';
import classes from './Footer.module.scss';
const t = formatI18nT('footer');

export default Footer;

function Footer() {
  return (
      <div className={classes._}>
      <div className={classes.inner}>
        <div className={classes.left}>
          <div className={classes.row}>
            <div className={classes.logo}>{i18n.t('logo')}</div>
          </div>
        </div>
        <div className={classes.references}>
          <div className={classes.row}>
            <Link to={URLSections.Catalogue.index} className={classes.rowItem} target='_blank'>{t('referencesCatalogue')}</Link>
            <Link to={URLSections.FreeZone.index} className={classes.rowItem} target='_blank'>{t('referencesBooks')}</Link>
            <Link to={URLSections.FreeZone.index} className={classes.rowItem} target='_blank'>{t('referencesFreeZone')}</Link>
            <Link to={URLSections.FreeZone.index} className={classes.rowItem} target='_blank'>{t('referencesReviews')}</Link>
          </div>
        </div>
        <div className={classes.social}>
          <div className={classes.row}>
            <Link to={t('socialYouTube.link')} className={classes.rowItem} target='_blank'>{t('socialYoutube.title')}</Link>
            <Link to={t('socialTelegram.link')} className={classes.rowItem} target='_blank'>{t('socialTelegram.title')}</Link>
            <Link to={t('socialVk.link')} className={classes.rowItem} target='_blank'>{t('socialVk.title')}</Link>
            <Link to={t('socialDzen.link')} className={classes.rowItem} target='_blank'>{t('socialDzen.title')}</Link>
        </div>
        </div>
        <div className={classes.documents}>
          <div className={classes.row}>
            <Link className={classes.rowItem} target='_blank'>{t('documentsPrivacyPolicy.title')}</Link>
            <Link className={classes.rowItem} target='_blank'>{t('documentsTermsOfUse.title')}</Link>
        </div>
        </div>
        <div className={classes.author}>
          <Link to={t('author.link')} className={classes.authorTitle} target='_blank'>{t('author.title')}</Link>
          </div>
      </div>
    </div>
  );
}
