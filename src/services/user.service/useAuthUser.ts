import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Subscription } from 'rxjs';

import { IRootState } from 'types';

import type UserService from '.';
import type { IUserData } from './types';

export default function useAuthedUser(this: UserService) {
  const authedUserId = useSelector((state: IRootState) => state.user.user?.id);
  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    if (!authedUserId) {
      setUser(null);
      return;
    }

    let cancelled = false;
    let subscription: Subscription | undefined;
    this.getUserBS({ filter: { id: authedUserId } })
      .then(bs => {
        subscription = bs.subscribe(a => {
          if (!a || a instanceof Error || cancelled) {
            return;
          }

          setUser(a.users[0]);
        });
      });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [authedUserId]);

  return user;
}
