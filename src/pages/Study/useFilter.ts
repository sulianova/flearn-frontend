import { useCallback, useMemo } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { THomeworkState } from 'types';

interface IFilter {
  userId: string | null
  limit: number | null
  homeworkState: THomeworkState | null
}

export default function useFilter() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const filter = useMemo(() => getFilterFromURL(search), [search]);
  const patchFilter = useCallback((patch: Partial<IFilter>) => {
    const newFilter: IFilter = { ...filter, ...patch };
    saveFilterToURL(navigate, pathname, newFilter);
  }, [filter]);

  return {filter, patchFilter};
}

function getFilterFromURL(search: string): IFilter {
  const params = new URLSearchParams(search);

  return {
    userId: params.get('userId'),
    limit: params.has('limit') ? +params.get('limit')! : null,
    homeworkState: params.get('homeworkState') as THomeworkState | null,
  };
}

function saveFilterToURL(navigate: NavigateFunction, path: string, filter: IFilter) {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([k, v]) => {
    const key = k as keyof IFilter;
    const value = v as IFilter[keyof IFilter];

    if (value !== null) {
      params.set(key, String(value));
    }
  });
  const q = params.toString();
  const query = q ? `?${q}` : '';

  navigate(`${path}${query}`);
}
