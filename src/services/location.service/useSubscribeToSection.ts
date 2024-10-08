import { useEffect } from 'react';

import { useURLSection } from 'hooks';

import type LocationService from '.';

export default function useSubscribeToSection(this: LocationService) {
  const section = useURLSection();

  useEffect(() => {
    this.URLSectionBS.next(section)
  }, [section]);
}
