import type { IUserData } from 'services/user.service';

export interface IProps {
  user: IUserData
  next: () => void
}
