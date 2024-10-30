import { useCallback, useState } from 'react';

export function useTabSwitcher(tabsLength: number) {
  const [tab, setTab] = useState(0);

  const setPrevTab = useCallback(() => setTab(prev => (prev - 1 + tabsLength) % tabsLength), [tabsLength]);
  const setNextTab = useCallback(() => setTab(prev => (prev + 1) % tabsLength), [tabsLength]);

  return {
    tab,
    setTab,
    setPrevTab,
    setNextTab,
  };
}
