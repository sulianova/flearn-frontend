import { Outlet } from 'react-router-dom';

import { userService } from 'services/user.service';

import Fallback from 'ui/Fallback';

export default ProtectedRoute;

interface IProtectedRouteProps {
  children?: ReturnType<React.FC>
}

function ProtectedRoute({ children }: IProtectedRouteProps): ReturnType<React.FC> {
  const authedUser = userService.useAuthedUser();

  if (!authedUser) {
    return <Fallback.Unauthorized/>;
  }

  return children ? children : <Outlet />;
};
