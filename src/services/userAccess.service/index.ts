import { BehaviorSubject, merge, Subject } from 'rxjs';

import { authService } from 'services/auth.service';
import { dataService } from 'services/data.service';
import { locationService } from 'services/location.service';

import { type TAccess } from './types';
import useCurrentCourseAccess from './useCurrentCourseAccess';

export { type TAccess, type TAccessData } from './types';

class UserAccessService {
  public useCurrentCourseAccess = useCurrentCourseAccess;
  public accessS = new Subject<{ type: 'updated' }>();
  public _currentCourseAccessBS = new BehaviorSubject<TAccess | null>(null);

  constructor() {
    this.initCurrentCourseAccessBS();
  }

  public get currentCourseAccess() {
    return this._currentCourseAccessBS.getValue() ?? 'FREE';
  }

  public async add(courseId: string, email: string, accessValue: TAccess) {
    await dataService.access.add(courseId, email, accessValue);
    this.accessS.next({ type: 'updated' });
  }

  protected initCurrentCourseAccessBS() {
    const refetch = () => {
      const authedUser = authService.user;
      const section = locationService.URLSection;
      if (
        (
          section.name !== 'Course'
          && section.name !== 'Profile'
          && section.name !== 'Study'
        )
        || !authedUser
    ) {
        this._currentCourseAccessBS.next(null);
        return;
      }

      dataService.access.get(section.params.courseId, authedUser.email)
        .then(access => {
          this._currentCourseAccessBS.next(access ?? 'FREE');
        })
        .catch(error => {
          console.log('Failed to fetch access for _currentCourseAccessBS', { error, authedUser, section });
          this._currentCourseAccessBS.next(null);
        });
    }

    merge(
      this.accessS,
      authService.firebaseUserBS,
      locationService.URLSectionBS,
    ).subscribe(refetch);
  }
}

export const userAccessService = new UserAccessService();
export default UserAccessService;
