
import { useEffect, useState } from 'react';
import { BehaviorSubject, fromEvent, interval, merge } from 'rxjs';
import { addDays } from 'utils';

interface IProps {
  deadline: Date
}

export default function useCountDown({ deadline }: IProps) {
  const [, triggerRender] = useState<number>(0);
  useEffect(() => {
    const subscribtion = interval(1_000)
      .subscribe(triggerRender);

      return () => subscribtion.unsubscribe();
  }, []);
  return getDateDiff(addDays(deadline, 1));
}

function getDateDiff(date: Date) {
  const now = new Date();
  const diff_s = Math.floor((+date - +now) / 1_000);
  if (diff_s <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff_s / (24 * 60 * 60));
  const hours = Math.floor((diff_s - days * (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diff_s - days * (24 * 60 * 60) - hours * (60 * 60)) / 60);
  const seconds = Math.floor(diff_s - days * (24 * 60 * 60) - hours * (60 * 60) - minutes * 60);

  return { days, hours, minutes, seconds };
}