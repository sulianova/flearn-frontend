import React from 'react';
import EditBar from './EditBar/EditBar';
import Footer, { EFooter } from './Footer/Footer';
import Header from './Header/Header';

import useHeightToCss from './useHeightToCss';

import classes from './Page.module.scss';

export default Page;
export { EFooter } from './Footer/Footer';

interface IProps {
  children: React.ReactNode
  header?: boolean
  footer?: boolean | EFooter
  wrapper?: 'Course' | 'Catalogue' | 'FreeZone' | 'My' | 'Lessons' | 'Lesson' | 'Fallback'
}

function Page({ children, header = false, footer, wrapper }: IProps) {
  const ref = useHeightToCss();

  return (
    <div className={classes._} ref={ref}>
      {header && <Header/>}
      <div className={classes.content}>
        {wrapper ?
          (<section className={classes[`${wrapper}-wrapper`]}>
            {children}
          </section>)
          : children
        }
        <EditBar/>
      </div>
      {footer !== false && <Footer type={footer === true ? EFooter.Default : footer}/>}
    </div>
  );
}
