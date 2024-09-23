import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { locationService } from 'services/location.service';

import PromoPopup from 'components/PromoPopup/PromoPopup';

import Home from 'pages/Home/Home';
import Landing from 'pages/Landing/Landing';
import Courses from 'pages/Courses/Courses';
import Course from 'pages/Course/Course';
import Profile from 'pages/Profile/Profile';
import Study from 'pages/Study/Study';
import Oferta from 'pages/Static/Oferta';
import Policy from 'pages/Static/Policy';
import Unsubscribe from 'pages/Static/Unsubscribe';
import TikTokLogin from 'pages/Static/TikTokLogin';
import ProtectedRoute from './ProtectedRoute';

import { URLSections } from './utils';

export { URLSections, type TRouteConfig } from './utils';
export * from './types';

export default function MyRouterContainer() {
  return (
    <BrowserRouter>
      <MyRouter/>
    </BrowserRouter>
  );
}

function MyRouter() {
  locationService.useSubscribeToLocation();
  locationService.useSubscribeToSection();
  locationService.useSubscribeToNavigate();

  return (
    <>
      <PromoPopup/>
      <Routes>
        <Route index path={URLSections.Home.index} element={<Home />} />
        <Route path={URLSections.Landing.index} element={<Landing />} />
        <Route path={URLSections.Courses.index} element={<Courses />} />
        <Route path={URLSections.Course.index} element={<Course />} />
        <Route path={URLSections.Study.index} element={<Study section='task'/>} />
        <Route path={URLSections.Study.Results.index} element={<Study section='results'/>} />
        <Route element={<ProtectedRoute />}>
          <Route path={URLSections.EmptyProfile.index} element={<Profile />} />
        </Route>
        <Route path={URLSections.Static.Oferta.index} element={<Oferta />}/>
        <Route path={URLSections.Static.Policy.index} element={<Policy />}/>
        <Route path={URLSections.Static.Unsubscribe.index} element={<Unsubscribe />}/>
        <Route path={URLSections.Static.TikTokLogin.index} element={<TikTokLogin/>}/>
        <Route path={'*'} element={<Navigate to={URLSections.Home.index} />}/>
      </Routes>
    </>
  );
}
