import { createContext } from 'react';
import { connect } from 'react-redux';
import { EErrorType, IErrorState, IRootState, IUserState, URLSections } from 'types';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FreeZone from 'pages/FreeZone';
import Catalogue from 'pages/Catalogue';
import Course from 'pages/Course/Landing/Course';
import Lesson from 'pages/Course/Lesson/Lesson';
import Lessons from 'pages/Course/Lessons/Lessons';
import My from 'pages/My/My';

import ProtectedRoute, { EFallback } from './ProtectedRoute';
import { CustomError } from 'utils';

export default connect(mapStateToProps)(MyRouter);

export const AuthContext = createContext<IUserState>({});
export const ErrorContext = createContext<IErrorState>({});

interface IConnectedProps {
  errorState: IErrorState
  userState: IUserState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    errorState: state.error,
    userState: state.user,
  };
}

interface IProps extends IConnectedProps{
  children?: React.ReactNode | React.ReactNode[]
}

function MyRouter({ errorState, userState }: IProps) {
  return (
    <ErrorContext.Provider value={errorState}>
      <AuthContext.Provider value={userState}>
        <BrowserRouter>
          <Routes>
            <Route index path={URLSections.FreeZone.index} element={<FreeZone />} />
            <Route path={URLSections.Catalogue.index} element={<Catalogue />} />
            <Route path={URLSections.Course.index} element={<Course />} />
            <Route path={URLSections.Course.Lessons.index} element={<Lessons />} />
            <Route element={
              <ProtectedRoute
                protect={({ errorState }) => !errorState.error?.error ? false
                  : !(errorState.error.error instanceof CustomError) ? (<p>{errorState.error.error.message}</p>)
                  : errorState.error.error.errorType === EErrorType.Unauthorized ? { type: EFallback.Unauthorized }
                  : errorState.error.error.errorType === EErrorType.Restricted ? { type: EFallback.Restricted }
                  : (<p>Never</p>)
                }
              />
            }>
              <Route path={URLSections.Course.Lesson.index} element={<Lesson />} />
              <Route path={URLSections.My.Profile.index} element={<My mode='Profile'/>} />
              <Route path={URLSections.My.Settings.index} element={<My mode='Settings'/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ErrorContext.Provider>
  );
}
