import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import UnauthorizedFallback from './Fallbacks/Unauthorized/Unauthorized';
import { AuthContext } from './index';

export default ProtectedRoute;


interface IProtectedRouteProps {
  children?: ReturnType<React.FC>
}

function ProtectedRoute({children}: IProtectedRouteProps): ReturnType<React.FC> {
  const userState = useContext(AuthContext);

  if (!userState.user) {
    return <UnauthorizedFallback/>;
  }

  return children ? children : <Outlet />;
};
