import React, { useCallback, useEffect, useRef, useState } from 'react';

import EditBar from './EditBar/EditBar';
import Footer, { EFooter } from './Footer/Footer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

import useHeightToCss from './useHeightToCss';

import classes from './Page.module.scss';

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
  style?: React.CSSProperties
  scrollToTopDependencie?: any
}

function Page({ children, variant, header = false, footer, style, scrollToTopDependencie }: IProps) {
  const ref = useHeightToCss();
  const pageRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    pageRef?.current?.scrollTo({ top: 0 });
  }, [scrollToTopDependencie]);

  const handleScroll = useCallback(() => {
    const scrollTop = Math.max(pageRef?.current?.scrollTop ?? 0, 0);
    setHeaderVisible(lastScrollTop.current >= scrollTop);
    lastScrollTop.current = scrollTop;
  }, []);

  return (
    <div className={classes.trainerContent}>
      {variant === EPageVariant.LMS && <Sidebar/>}
      <div className={classes.theoryPage} onScroll={handleScroll} ref={pageRef}>
        <div className={classes._} ref={ref} style={style}>
          {header && <Header variant={variant} visible={headerVisible}/>}
          <div className={classes.content}>
              <section className={classes[`${variant}Wrapper`]}>
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
