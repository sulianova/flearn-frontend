import React from 'react';
import classes from './header.module.scss';

export default Header;

function Header() {
    return (
        <div className={classes.Header}>
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
                <div className={classes.Hamburger}></div>
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
                    <a className="header-login-btn s-text-24">Войти</a>
                </div>
            </div>
        </div>
    );
}
