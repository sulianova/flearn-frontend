import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Course from 'pages/Course/Landing/Course';
import Lesson from 'pages/Course/Lesson/Lesson';
import Lessons from 'pages/Course/Lessons/Lessons';
import My from 'pages/My/My';

import Oferta from 'pages/Static/Oferta';
import Policy from 'pages/Static/Policy';

import { URLSections } from 'types';

import ProtectedRoute from './ProtectedRoute';

export default function MyRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={URLSections.Home.index} element={<Home />} />
        <Route path={URLSections.Course.index} element={<Course />} />
        <Route path={URLSections.Course.Lessons.index} element={<Lessons />} />
        <Route element={<ProtectedRoute />}>
          <Route path={URLSections.Course.Lesson.index} element={<Lesson section='task'/>} />
          <Route path={URLSections.Course.Lesson.MyWork.index} element={<Lesson section='my-work'/>} />
          <Route path={URLSections.Course.Lesson.Results.index} element={<Lesson section='results'/>} />
          <Route path={URLSections.My.Profile.index} element={<My mode='Profile'/>} />
          <Route path={URLSections.My.Settings.index} element={<My mode='Settings'/>} />
        </Route>
        <Route path={URLSections.Static.Oferta.index} element={<Oferta />}/>
        <Route path={URLSections.Static.Policy.index} element={<Policy />}/>
        <Route path={'*'} element={<Navigate to={URLSections.Home.index} />}/>
      </Routes>
    </BrowserRouter>
  );
}
