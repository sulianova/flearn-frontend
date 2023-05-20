import React from 'react'
import Footer from './Footer/Footer';
import Header from './Header/Header';
import classes from './Page.module.scss';

export default Page;

interface IProps {
    children: React.ReactNode;
    header?: boolean;
    footer?: boolean;
}

function Page({ children, header = false, footer = false }: IProps) {
    return (
        <div className={classes.Page}>
            {header && <Header/>}
            <div className={classes.Content}>{children}</div>
            {footer && <Footer/>}
        </div>
    );
}
