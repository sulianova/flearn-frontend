import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import classes from './Page.module.scss';

export default Page;

interface IProps {
    children: React.ReactNode
    header?: boolean
    footer?: boolean
    wrapper?: 'Course' | 'Catalogue' | 'FreeZone' | 'My' | 'Lessons' | 'Lesson'
}

function Page({ children, header = false, footer = false, wrapper }: IProps) {
    return (
        <div className={classes._}>
            {header && <Header/>}
            <div className={classes.content}>
            {wrapper ?
                (<section className={classes[`${wrapper}-wrapper`]}>
                    {children}
                </section>)
                : children
            }
            </div>
            {footer && <Footer/>}
        </div>
    );
}
