import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

export function useBehaviourSubjectValue<T>(subject: BehaviorSubject<T>, initialValue?: T) {
  const [value, setValue] = useState(initialValue !== undefined ? initialValue : subject.getValue());

  useEffect(() => {
    const s = subject.subscribe(v => {
      setValue(v);
    });
    return () => s.unsubscribe();
  }, [subject]);

  return value;
}
