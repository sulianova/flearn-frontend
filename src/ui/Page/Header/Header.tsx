import React, { useState } from 'react';
import classnames from 'classnames/bind';
import classes from './header.module.scss';
import Link from 'ui/Link/Link';
// import { Link } from "react-router-dom";

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
                        <Link to={'/free-zone'} className="s-text-24">flearn</Link>
                    </div>
                </div>
                <div className={classes.Nav}>
                    <div className={classes.NavItem}>
                        <Link to={'/profile'} className="inline-link">Moe обучение</Link>
                    </div>
                    <div className={classes.NavItem}>
                        <Link to={'/free-zone'} className="inline-link">Бесплатно</Link>
                    </div>
                    <div className={classes.NavItem}>
                        <Link to={'/catalogue'} className="inline-link">Программы обучения</Link>
                    </div>
                </div>
                <div className={classes.NavLogin}>
                    <Link to={'/profile'} className="inline-link">Войти</Link>
                </div>
                <div className={classes.Humburger} onClick={() => setIsOpened(o => !o)}></div>
            </div>
            <div className={classes.Mob}> 
                <div className={classes.MobMenuMain}>
                    <div className={classes.MobItem}>
                        <Link to={'/profile'} className="inline-link s-text-24">
                            <span className="inline-text">Мое обучение</span>
                        </Link>
                    </div>
                    <div className={classes.MobItem}>
                        <Link to={'/free-zone'} className="inline-link s-text-24">
                            <span className="inline-text">Бесплатно</span>
                        </Link>
                    </div>
                    <div className={classes.MobItem}>
                        <Link to={'/catalogue'} className="inline-link s-text-24">
                            <span className="inline-text">Программы обучения</span>
                        </Link>
                    </div>
                </div>
                <div className={classes.MobSpacing}></div>
                <div className={classes.MobMenuControls}>
                    <Link to={'/profile'} className={classes.LoginBtn + " s-text-24"}>Войти</Link>
                </div>
            </div>
        </div>
    );
}
