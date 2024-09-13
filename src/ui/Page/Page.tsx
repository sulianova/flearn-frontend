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
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [scrollToTopDependencie]);

  useEffect(() => {
    document.body.style.setProperty('background-color', backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    const calc = () => {
      const minScroll = 0;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const capedScrollTop = Math.min(Math.max(window.scrollY, minScroll), maxScroll);
      const pageHasScroll = maxScroll > 0;
      setHeaderVisible(!pageHasScroll || (lastScrollTop.current >= capedScrollTop && capedScrollTop !== maxScroll));
      lastScrollTop.current = capedScrollTop;
    };

    calc();
  
    window.addEventListener('scroll', calc);
    document.body.addEventListener('resize', calc);

    return () => {
      window.removeEventListener('scroll', calc);
      document.body.removeEventListener('resiz', calc);
    };
  }, []);

  return (
    <div className={classes.trainerContent}>
      <div className={classes.theoryPage}>
        {(variant !== EPageVariant.WEB) && <Sidebar/>}
        <div className={classes.__} data-footer={footer !== false} ref={ref}>
          {header && <Header variant={variant} visible={true}/>}
          <div className={classes.content}>
            <section className={classes[`${variant}Wrapper`]}>
              <MobileBtn course={currentCourse} variant={variant} visible={headerVisible}/>
              {children}
            </section>
            <EditBar/>
          </div>
          {footer !== false && <Footer variant={variant} type={footer === true ? EFooter.Default : footer}/>}
        </div>
      </div>
    </div>
  );
}
