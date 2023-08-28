import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export type TURLSection = 'Course' | 'Lessons' | 'Lesson' | 'Other';

const courseRegex = /\/course\/[^\/]+$/;
const lessonsRegex = /\/course\/[^\/]+\/lessons$/;
const lessonRegex = /\/course\/[^\/]+\/lesson\/[^\/]+$/;

export function useURLSection() {
  const location = useLocation();

  const variant: TURLSection = useMemo(() => {
    if (courseRegex.test(location.pathname)) {
      return 'Course';
    } else if (lessonsRegex.test(location.pathname)) {
      return 'Lessons';
    } else if (lessonRegex.test(location.pathname)) {
      return 'Lesson';
    } else {
      return 'Other';
    }
  }, [location.pathname]);

  return variant;
}
