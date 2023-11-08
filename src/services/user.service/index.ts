export { type IUserData, type IUserDataDB } from './types';

class UserService {
  private async _fetch(props: {
    filter: { id?: string, ids?: string[] },
  }) {
    try {
      
    } catch (error) {
      // tslint:disable-next-line
      console.log(`Failed to fetch users`, { props, error });
      throw error;
    }
  }
}

export const userService = new UserService;
