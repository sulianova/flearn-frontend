import { createContext } from 'react';
import { connect } from 'react-redux';
import { IRootState, IUserState, URLSections } from 'types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// import FreeZone from 'pages/FreeZone';
import Catalogue from 'pages/Catalogue';
import Course from 'pages/Course/Landing/Course';
import Lesson from 'pages/Course/Lesson/Lesson';
import Lessons from 'pages/Course/Lessons/Lessons';
import My from 'pages/My/My';

import Oferta from 'pages/Static/Oferta';
import Policy from 'pages/Static/Policy';

import ProtectedRoute from './ProtectedRoute';

export default connect(mapStateToProps)(MyRouter);

export const AuthContext = createContext<IUserState>({});

interface IConnectedProps {
  userState: IUserState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    userState: state.user,
  };
}

interface IProps extends IConnectedProps{
  children?: React.ReactNode | React.ReactNode[]
}

function MyRouter({ userState }: IProps) {
  return (
    <AuthContext.Provider value={userState}>
      <BrowserRouter>
        <Routes>
          <Route index path={URLSections.FreeZone.index} element={<Navigate to={URLSections.Course.to({ courseId: 'illustration' })} />} />
          <Route path={URLSections.Catalogue.index} element={<Catalogue />} />
          <Route path={URLSections.Course.index} element={<Course />} />
          <Route path={URLSections.Course.Lessons.index} element={<Lessons />} />
          <Route element={<ProtectedRoute />}>
            <Route path={URLSections.Course.Lesson.index} element={<Lesson practice='task'/>} />
            <Route path={URLSections.Course.Lesson.Results.index} element={<Lesson practice='results'/>} />
            <Route path={URLSections.My.Profile.index} element={<My mode='Profile'/>} />
            <Route path={URLSections.My.Settings.index} element={<My mode='Settings'/>} />
          </Route>
          <Route path={URLSections.Static.Oferta.index} element={<Oferta />}/>
          <Route path={URLSections.Static.Policy.index} element={<Policy />}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
