import EditBar from './EditBar/EditBar';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import useHeightToCss from './useHeightToCss';

import classes from './Page.module.scss';

export default Page;

interface IProps {
    children: React.ReactNode
    header?: boolean
    footer?: boolean
    wrapper?: 'Course' | 'Catalogue' | 'FreeZone' | 'My' | 'Lessons' | 'Lesson'
}

function Page({ children, header = false, footer = false, wrapper }: IProps) {
  const ref = useHeightToCss();

  return (
    <div className={classes._} ref={ref}>
      {header && <Header/>}
      <div className={classes.content}>
        {wrapper ?
          (<section className={classes[`${wrapper}-wrapper`]}>
              {children}
              {['Course', 'Lessons', 'Lesson'].includes(wrapper || '')
                && (<EditBar variant={wrapper as 'Course' | 'Lessons' | 'Lesson'}/>)
              }
          </section>)
          : children
        }
      </div>
      {footer && <Footer/>}
    </div>
  );
}
