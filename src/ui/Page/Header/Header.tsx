import classnames from 'classnames/bind';
import { useState } from 'react';
import { EURLSection } from 'types';
import Link from 'ui/Link/Link';

import classes from './header.module.scss';

const cx = classnames.bind(classes);

export default Header;

function Header() {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const headerClass = cx({ Header: true, IsMobileMenuOpened: isOpened });

    return (
        <div className={headerClass}>
            <div className={classes.Desk}>
                <div className={classes.Logo}>
                    <div className={classes.LogoWrapper}>
                        <Link to={EURLSection.FreeZone} className='s-text-24'>flearn</Link>
                    </div>
                </div>
                <div className={classes.Nav}>
                    <div className={classes.NavItem}>
                        <Link to={EURLSection.Profile} className='inline-link'>Moe обучение</Link>
                    </div>
                    <div className={classes.NavItem}>
                        <Link to={EURLSection.FreeZone} className='inline-link'>Бесплатно</Link>
                    </div>
                    <div className={classes.NavItem}>
                        <Link to={EURLSection.Catalogue} className='inline-link'>Программы обучения</Link>
                    </div>
                </div>
                <div className={classes.NavLogin}>
                    <Link to={EURLSection.Profile} className='inline-link'>Войти</Link>
                </div>
                <div className={classes.Humburger} onClick={() => setIsOpened(o => !o)}/>
            </div>
            <div className={classes.Mob}>
                <div className={classes.MobMenuMain}>
                    <div className={classes.MobItem}>
                        <Link to={EURLSection.Profile} className='inline-link s-text-24'>
                            <span className='inline-text'>Мое обучение</span>
                        </Link>
                    </div>
                    <div className={classes.MobItem}>
                        <Link to={EURLSection.FreeZone} className='inline-link s-text-24'>
                            <span className='inline-text'>Бесплатно</span>
                        </Link>
                    </div>
                    <div className={classes.MobItem}>
                        <Link to={EURLSection.Catalogue} className='inline-link s-text-24'>
                            <span className='inline-text'>Программы обучения</span>
                        </Link>
                    </div>
                </div>
                <div className={classes.MobSpacing}/>
                <div className={classes.MobMenuControls}>
                    <Link to={EURLSection.Profile} className={classes.LoginBtn + ' s-text-24'}>Войти</Link>
                </div>
            </div>
        </div>
    );
}
