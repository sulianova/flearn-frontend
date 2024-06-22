import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export type TURLSection = 'Home' | 'Course' | 'EmptyProfile' | 'Profile' | 'Study' | 'Other';

const homeRegex = /^\/$/;
const courseRegex = /\/course\/[^\/]+$/;
const emptyProfileRegex = /\/profile$/;
const profileRegex = /\/profile\/[^\/]+$/;
const studyRegex = /\/study\/[^\/]+\/[^\/]+$/;

export function useURLSection() {
  const location = useLocation();

  const variant: TURLSection = useMemo(() => {
    if (homeRegex.test(location.pathname)) {
      return 'Home';
    } else if (courseRegex.test(location.pathname)) {
      return 'Course';
    } else if (emptyProfileRegex.test(location.pathname)) {
      return 'EmptyProfile';
    } else if (profileRegex.test(location.pathname)) {
      return 'Profile';
    } else if (studyRegex.test(location.pathname)) {
      return 'Study';
    } else {
      return 'Other';
    }
  }, [location.pathname]);

  return variant;
}
