import React, { useEffect, useRef, useState } from 'react';

import EditBar from './EditBar/EditBar';
import Footer, { EFooter } from './Footer/Footer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MobileBtn from './MobileBtn/MobileBtn';

import useHeightToCss from './useHeightToCss';

import classes from './Page.module.scss';
import { ICourseData } from 'services/course.service';

export default Page;
export { EFooter } from './Footer/Footer';

export enum EPageVariant {
  WEB = 'WEB',
  LMS = 'LMS',
  Fallback = 'Fallback',
}

interface IProps {
  children: React.ReactNode
  variant: EPageVariant
  header?: boolean
  footer?: boolean | EFooter
  scrollToTopDependencie?: any
  backgroundColor?: string
  currentCourse?: ICourseData
}

function Page({ children, variant, header = false, footer, backgroundColor = 'var(--color-background-alternate)', scrollToTopDependencie, currentCourse }: IProps) {
  const ref = useHeightToCss();
  const lastScrollTop = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [scrollToTopDependencie]);

  useEffect(() => {
    document.body.style.setProperty('background-color', backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    const handleScroll = () => {
      const minScroll = 0;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const capedScrollTop = Math.min(Math.max(window.scrollY, minScroll), maxScroll);
      setHeaderVisible(lastScrollTop.current >= capedScrollTop && capedScrollTop !== maxScroll);
      lastScrollTop.current = capedScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes.trainerContent}>
      {variant === EPageVariant.LMS && <Sidebar/>}
      <div className={classes.theoryPage}>
        <div className={classes._} ref={ref}>
          {header && <Header variant={variant} visible={headerVisible}/>}
          <div className={classes.content}>
            <section className={classes[`${variant}Wrapper`]}>
              <MobileBtn course={currentCourse} variant={variant} visible={headerVisible}/>
              {children}
            </section>
            <EditBar/>
          </div>
          {footer !== false && <Footer type={footer === true ? EFooter.Default : footer}/>}
        </div>
      </div>
    </div>
  );
}
