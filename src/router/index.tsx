import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Course from 'pages/Course/Landing/Course';
import Lesson from 'pages/Course/Lesson/Lesson';
import Lessons from 'pages/Course/Lessons/Lessons';

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
          <Route path={URLSections.Course.Lessons.index} element={<Lessons />} />
          <Route path={URLSections.Course.Lesson.index} element={<Lesson section='task'/>} />
          <Route path={URLSections.Course.Lesson.MyWork.index} element={<Lesson section='my-work'/>} />
          <Route path={URLSections.Course.Lesson.Results.index} element={<Lesson section='results'/>} />
        </Route>
        <Route path={URLSections.Static.Oferta.index} element={<Oferta />}/>
        <Route path={URLSections.Static.Policy.index} element={<Policy />}/>
        <Route path={'*'} element={<Navigate to={URLSections.Home.index} />}/>
      </Routes>
    </BrowserRouter>
  );
}
