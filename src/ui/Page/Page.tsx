import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import classes from './Page.module.scss';

export default Page;

interface IProps {
    children: React.ReactNode
    header?: boolean
    footer?: boolean
    wrapper?: 'Course' | 'Catalogue' | 'FreeZone' | 'My'
}

function Page({ children, header = false, footer = false, wrapper }: IProps) {
    return (
        <div className={classes.Page}>
            {header && <Header/>}
            <div className={classes.content}>
            {wrapper ?
                (<div className={classes[`${wrapper}-wrapper`]}>
                    {children}
                </div>)
                : children
            }
            </div>
            {footer && <Footer/>}
        </div>
    );
}
