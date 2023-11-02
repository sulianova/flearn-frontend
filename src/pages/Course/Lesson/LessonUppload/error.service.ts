import { BehaviorSubject } from 'rxjs'
import { v4 } from 'uuid';

import { useBehaviourSubjectValue } from 'hooks';

type TError = {
  id: string
  error: string
}

const TIME_TO_SHOW = 10_000;

class ErrorService {
  public useErrors = () => useBehaviourSubjectValue(this.errorBS);

  public addError(error: string) {
    const id = v4();
    this.errorBS.next([...this.errorBS.getValue(), { id, error }]);
    setTimeout(() => this.removeError(id), TIME_TO_SHOW);
  }

  private removeError(id: string) {
    const errors = this.errorBS.getValue();
    const index = errors.findIndex(e => e.id === id);
    if (index === -1) {
      return;
    }

    errors.splice(index, 1);
    this.errorBS.next([...errors]);
  }

  private errorBS = new BehaviorSubject<TError[]>([]);
}

export const errorService = new ErrorService();
