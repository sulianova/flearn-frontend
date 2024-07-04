import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { URLSections, type ParamsToSectionMap } from 'router';
import { Entries } from 'utils';

type TRes<T = Entries<ParamsToSectionMap>[number]> =
  T extends [infer SectionName, infer SectionParams]
    ? { name: SectionName, params: SectionParams }
  : never;

export function useURLSection(): TRes {
  const location = useLocation();

  return useMemo(() => {
    if (URLSections.Home.regex.test(location.pathname)) {
      return { name: 'Home', params: URLSections.Home.getParams(location.pathname)! };
    } else if (URLSections.Course.regex.test(location.pathname)) {
      return { name: 'Course', params: URLSections.Course.getParams(location.pathname)! };
    } else if (URLSections.Profile.regex.test(location.pathname)) {
      return { name: 'Profile', params: URLSections.Profile.getParams(location.pathname)! };
    } else if (URLSections.EmptyProfile.regex.test(location.pathname)) {
      return { name: 'EmptyProfile', params: URLSections.EmptyProfile.getParams(location.pathname)! };
    } else if (URLSections.Study.regex.test(location.pathname)) {
      return { name: 'Study', params: URLSections.Study.getParams(location.pathname)! };
    } else {
      return { name: 'Other', params: {} };
    }
  }, [location.pathname]);
}
