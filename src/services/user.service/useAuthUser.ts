import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Subscription } from 'rxjs';

import { useIsMounted } from 'hooks';
import { IRootState } from 'types';

import type UserService from '.';
import type { IUserData } from './types';

export default function useAuthedUser(this: UserService) {
  const authedUserId = useSelector((state: IRootState) => state.user.user?.id);
  const [user, setUser] = useState<IUserData | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!authedUserId) {
      setUser(null);
      return;
    }

    let subscription: Subscription;
    this.getUserBS({ filter: { id: authedUserId } })
      .then(bs => {
        subscription = bs.subscribe(a => {
          if (a && !(a instanceof Error) && a.users[0] && isMounted.current) {
            setUser(a.users[0]);
          }
        });
      });

    return () => subscription.unsubscribe();
  }, [authedUserId]);

  return user;
}
