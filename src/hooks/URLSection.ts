import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { type TURLSectionObj, URLSections } from 'router';

export function useURLSection(): TURLSectionObj {
  const location = useLocation();

  return useMemo(() => {
    const pathname = decodeURI(location.pathname);
    if (URLSections.Home.regex.test(pathname)) {
      return { name: 'Home', params: URLSections.Home.getParams(pathname)! };
    } else if (URLSections.Course.regex.test(pathname)) {
      return { name: 'Course', params: URLSections.Course.getParams(pathname)! };
    } else if (URLSections.Profile.regex.test(pathname)) {
      return { name: 'Profile', params: URLSections.Profile.getParams(pathname)! };
    } else if (URLSections.EmptyProfile.regex.test(pathname)) {
      return { name: 'EmptyProfile', params: URLSections.EmptyProfile.getParams(pathname)! };
    } else if (URLSections.Study.regex.test(pathname)) {
      return { name: 'Study', params: URLSections.Study.getParams(pathname)! };
    } else {
      return { name: 'Other', params: {} };
    }
  }, [location.pathname]);
}
