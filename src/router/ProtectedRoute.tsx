import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import RestrictedFallback from './Fallbacks/Restricted/Restricted';
import UnauthorizedFallback from './Fallbacks/Unauthorized/Unauthorized';
import { AuthContext, ErrorContext } from './index';
import { IErrorState, IUserState } from 'types';

export default ProtectedRoute;

export enum EFallback {
  Unauthorized = 'unauthorized',
  Restricted = 'restricted',
}

interface IProtectedRouteProps {
  children?: ReturnType<React.FC>
  protect: (props: { errorState: IErrorState, userState: IUserState }) => false | { type: EFallback, props?: any } | React.ReactElement<any, any>
}

function ProtectedRoute(props: IProtectedRouteProps): ReturnType<React.FC> {
  const { children, protect } = props;
  const userState = useContext(AuthContext);
  const errorState = useContext(ErrorContext);
  const protectRes = protect({ errorState, userState });

  if (protectRes === false) {
    return children ? children : <Outlet />;
  }

  if (protectRes?.type === EFallback.Unauthorized) {
    return <UnauthorizedFallback/>;
  }

  if (protectRes?.type === EFallback.Restricted) {
    return <RestrictedFallback/>;
  }

  return protectRes as React.ReactElement<any, any>;
};
