import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Fallback from 'ui/Fallback';

import { AuthContext } from './index';

export default ProtectedRoute;

interface IProtectedRouteProps {
  children?: ReturnType<React.FC>
}

function ProtectedRoute({ children }: IProtectedRouteProps): ReturnType<React.FC> {
  const userState = useContext(AuthContext);

  if (!userState.user) {
    return <Fallback.Unauthorized/>;
  }

  return children ? children : <Outlet />;
};
