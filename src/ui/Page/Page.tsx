import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const pageRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = pageRef?.current?.scrollTop ?? 0;
    setHeaderVisible(lastScrollTop.current > scrollTop);
    lastScrollTop.current = scrollTop;
  }, []);

  return (
    <div className={classes.trainerContent}>
      <Sidebar/>
      <div className={classes.theoryPage}   onScroll={handleScroll} ref={pageRef}>
        <div 