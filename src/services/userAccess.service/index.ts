import { Subject } from 'rxjs';
import { dataService } from 'services';

import { TAccess } from 'services/data.service/Access';

class UserAccessService {
  public accessS = new Subject<{ type: 'updated' }>();
  public async add(courseId: string, email: string, accessValue: TAccess) {
    return dataService.access.add(courseId, email, accessValue);
  }
}

export const userAccessService = new UserAccessService();
