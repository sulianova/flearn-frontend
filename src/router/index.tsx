import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Course from 'pages/Course/Course';
import EmptyProfile from 'pages/EmptyProfile/EmptyProfile';
import Profile from 'pages/Profile/Profile';
import Study from 'pages/Study/Study';

import Oferta from 'pages/Static/Oferta';
import Policy from 'pages/Static/Policy';

import ProtectedRoute from './ProtectedRoute';
import { URLSections } from './utils';

export { URLSections, type TRouteConfig } from './utils';

export default function MyRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={URLSections.Home.index} element={<Home />} />
        <Route path={URLSections.Course.index} element={<Course />} />
        <Route element={<ProtectedRoute />}>
          <Route path={URLSections.EmptyProfile.index} element={<EmptyProfile />} />
          <Route path={URLSections.Profile.index} element={<Profile />} />
          <Route path={URLSections.Study.index} element={<Study section='task'/>} />
          <Route path={URLSections.Study.Results.index} element={<Study section='results'/>} />
          <Route path={URLSections.Study.Results.index} element={<Study section='my-work'/>} />
        </Route>
        <Route path={URLSections.Static.Oferta.index} element={<Oferta />}/>
        <Route path={URLSections.Static.Policy.index} element={<Policy />}/>
        <Route path={'*'} element={<Navigate to={URLSections.Home.index} />}/>
      </Routes>
    </BrowserRouter>
  );
}
