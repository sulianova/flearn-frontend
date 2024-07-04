import { Subject } from 'rxjs';
import { dataService } from 'services';

import { TAccess } from 'services/data.service/Access';

class UserAccessService {
  public accessS = new Subject<{ type: 'updated' }>();
  public async add(courseId: string, email: string, accessValue: TAccess) {
    await dataService.access.add(courseId, email, accessValue);
    this.accessS.next({ type: 'updated' });
  }
}

export const userAccessService = new UserAccessService();
