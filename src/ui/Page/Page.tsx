import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';

import EditBar from './EditBar/EditBar';
import Footer, { EFooter } from './Footer/Footer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

import useHeightToCss from './useHeightToCss';

import classes from './Page.module.scss';
import { ICourseData } from 'services/course.service';
import { ILessonData } from 'services/lesson.service';

export default Page;
export { EFooter } from './Footer/Footer';

export enum EPageVariant {
  WEB = 'WEB',
  LMS = 'LMS',
  Fallback = 'Fallback',
}

export const PageContext = createContext<IPageContext | null>(null);

interface IPageContext {
  currentCourse: ICourseData | undefined;
  userCourses: ICourseData[];
  firstNotSolvedLesson: ILessonData | null;
  currentLesson: ILessonData | undefined;
  topicLessons: (ILessonData & {
    solved: boolean;
    canBeAccessed: boolean;
  })[] | undefined
}

interface IProps {
  children: React.ReactNode
  variant: EPageVariant
  header?: boolean
  footer?: boolean | EFooter
  scrollToTopDependencie?: any
  backgroundColor?: string
}

function Page({ children, variant, header = false, footer, backgroundColor = 'var(--color-background-alternate)', scrollToTopDependencie }: IProps) {
  const ref = useHeightToCss();
  const pageRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    pageRef?.current?.scrollTo({ top: 0 });
  }, [scrollToTopDependencie]);

  useEffect(() => {
    document.body.style.setProperty('background-color', backgroundColor);
  }, [backgroundColor]);

  const handleScroll = useCallback(() => {
    const scrollTop = Math.max(pageRef?.current?.scrollTop ?? 0, 0);
    setHeaderVisible(lastScrollTop.current >= scrollTop);
    lastScrollTop.current = scrollTop;
  }, []);

  return (
    <div className={classes.trainerContent}>
      {variant === EPageVariant.LMS && <Sidebar/>}
      <div className={classes.theoryPage} onScroll={handleScroll} ref={pageRef}>
        <div className={classes._} ref={ref}>
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
