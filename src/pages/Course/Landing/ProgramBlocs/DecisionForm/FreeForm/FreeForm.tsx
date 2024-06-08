import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

import { dataService } from 'services';
import type { ICourseData } from 'services/course.service';
import type { IUserData } from 'services/user.service';

import { URLSections } from 'types';

import classes from './FreeForm.module.scss';

export default FreeForm;

function FreeForm(props: { userData: IUserData, courseData: ICourseData }) {
  const { userData, courseData } = props;
  const navigate = useNavigate();
  const [errorTxt, setErrorTxt] = useState('');
  return (
    <div className={classes.btnWrapper}>
      <button className={classes.btn + ' s-text-24'} onClick={() => handleSubmit({ userData, courseData, navigate, onError: setErrorTxt })}>Начать учиться бесплатно</button>
      {errorTxt && <div>{errorTxt}</div>}
    </div>
  );
}

async function handleSubmit(props: { userData: IUserData, courseData: ICourseData, navigate: NavigateFunction, onError: (error: string) => void }) {
  try {
    await submitFreeOrderAndGrandAccess(props);
    props.navigate(URLSections.My.Profile.index);
  } catch (e) {
    const error = e as Error;
    props.onError(error.message);
  }
}

async function submitFreeOrderAndGrandAccess(props: { userData: IUserData, courseData: ICourseData }) {
  const { userData, courseData } = props;
  try {
    if (!await dataService.order.exists(courseData.id, userData.email)) {
      await dataService.order.create({ userFromForm: { email: userData.email }, courseData, userData });
    }

    // TEMP
    await dataService.access.add(courseData.id, userData.email, 'FREE');
    await dataService.userCourseProgress.init(courseData.id, userData.email);
  } catch (e) {
    const error = e as Error;
    // tslint:disable-next-line: no-console
    console.error('Failed to submit free order and grand access', error);
    throw new Error('Failed to submit free order and grand access');
  }
}
