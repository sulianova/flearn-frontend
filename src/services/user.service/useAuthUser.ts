import { useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';

import { useBehaviourSubjectValue } from 'hooks';
import { authService } from 'services';

import type { default as UserService, IUserData } from '.';

export default function useAuthedUser(this: UserService) {
  const authedUserId = useBehaviourSubjectValue(authService.firebaseUserBS)?.uid;
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
