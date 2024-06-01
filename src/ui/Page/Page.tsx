import React, { useEffect } from 'react';
import EditBar from './EditBar/EditBar';
import Footer, { EFooter } from './Footer/Footer';
import Header from './Header/Header';
import Sidebar from 'ui/Sidebar/Sidebar';

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
}

function Page({ children, variant, header = false, footer, style }: IProps) {
  const ref = useHeightToCss();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={classes._} ref={ref} style={style}>
      {header && <Header variant={variant}/>}
      <Sidebar/>
      <div className={classes.content}>
          <section className={classes[`${variant}Wrapper`]}>
            {children}
          </section>
        <EditBar/>
      </div>
      {footer !== false && <Footer type={footer === true ? EFooter.Default : footer}/>}
    </div>
  );
}
