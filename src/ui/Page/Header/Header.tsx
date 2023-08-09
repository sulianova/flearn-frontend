import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { firebaseService } from 'services';
import { formatI18nT, i18n } from 'shared';
import { URLSections } from 'types';
import Link from 'ui/Link/Link';

import classes from './header.module.scss';

const cx = classnames.bind(classes);
const t = formatI18nT('header');

export default Header;

function Header() {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const headerClass = cx({ _: true, IsMobileMenuOpened: isOpened });

    useEffect(() => {
        if (isOpened) {
            document.body.style.overflowY = 'hidden';

            return () => {
                document.body.style.overflowY = '';
            };
        }
    },        [isOpened]);

    return (
        <div className={headerClass}>
            <div className={classes.desc}>
                <div className={classes.logo}>
                    <div className={classes.logoWrapper}>
                        <Link to={URLSections.FreeZone.index} className='s-text-24'>{i18n.t('logo')}</Link>
                    </div>
                </div>
                <div className={classes.nav}>
                    <div className={classes.navItem}>
                        <Link to={URLSections.Course.to({ courseId: 'how-to-draw' })} className='inline-link'>Best courses</Link>
                    </div>
                    <div className={classes.navItem}>
                        <Link to={URLSections.My.Profile.index} className='inline-link'>{t('my')}</Link>
                    </div>
                    <div className={classes.navItem}>
                        <Link to={URLSections.FreeZone.index} className='inline-link'>{t('freeZone')}</Link>
                    </div>
                    <div className={classes.navItem}>
                        <Link to={URLSections.Catalogue.index} className='inline-link'>{t('catalogue')}</Link>
                    </div>
                </div>
                <div className={classes.navLogin}>
                    <span className='inline-link' onClick={() => firebaseService.authenticate()}>
                        {t('login.signIn')}
                    </span>
                    {/* <Link
                        to={URLSections.My.Profile.index}
                        className='inline-link'
                        onClick={() => firebaseService.authenticate()}
                    >{t('login.signIn')}</Link> */}
                </div>
                <div className={classes.humburger} onClick={() => setIsOpened(o => !o)}/>
            </div>
            <div className={classes.mob}>
                <div className={classes.mobMenuMain}>
                    <div className={classes.mobItem}>
                        <Link to={URLSections.My.Profile.index} className='inline-link s-text-36'>
                            <span className='inline-text'>{t('my')}</span>
                        </Link>
                    </div>
                    <div className={classes.mobItem}>
                        <Link to={URLSections.FreeZone.index} className='inline-link s-text-36'>
                            <span className='inline-text'>{t('freeZone')}</span>
                        </Link>
                    </div>
                    <div className={classes.mobItem}>
                        <Link to={URLSections.Catalogue.index} className='inline-link s-text-36'>
                            <span className='inline-text'>{t('catalogue')}</span>
                        </Link>
                    </div>
                </div>
                <div className={classes.mobMenuControls}>
                    <Link to={URLSections.My.Profile.index} className={classes.loginBtn + ' s-text-24'}>{t('login.signIn')}</Link>
                </div>
            </div>
        </div>
    );
}
