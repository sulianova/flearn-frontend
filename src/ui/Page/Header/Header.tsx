import React, { useState } from 'react';
import classnames from 'classnames/bind';
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
                        <a href="free-zone.html" className="s-text-24">flearn</a>
                    </div>
                </div>
                <div className={classes.Nav}>
                    <div className={classes.NavItem}>
                        <a className="inline-link" href="profile.html#profile">Moe обучение</a>
                    </div>
                    <div className={classes.NavItem}>
                        <a className="inline-link" href="free-zone.html">Бесплатно</a>
                    </div>
                    <div className={classes.NavItem}>
                        <a className="inline-link" href="catalogue.html">Программы обучения</a>
                    </div>
                </div>
                <div className={classes.NavLogin}>
                    <a className="inline-link" href="profile.html">Войти</a>
                </div>
                <div className={classes.Humburger} onClick={() => setIsOpened(o => !o)}></div>
            </div>
            <div className={classes.Mob}> 
                <div className={classes.MobMenuMain}>
                    <div className={classes.MobItem}>
                        <a className="inline-link s-text-24"><span className="inline-text">Мое обучение</span></a>
                    </div>
                    <div className={classes.MobItem}>
                        <a className="inline-link s-text-24"><span className="inline-text">Бесплатно</span></a>
                    </div>
                    <div className={classes.MobItem}>
                        <a className="inline-link s-text-24"><span className="inline-text">Программы обучения</span></a>
                    </div>
                </div>
                <div className={classes.MobSpacing}></div>
                <div className={classes.MobMenuControls}>
                    <a className={classes.LoginBtn + " s-text-24"}>Войти</a>
                </div>
            </div>
        </div>
    );
}
