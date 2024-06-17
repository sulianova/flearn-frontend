import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

import { dataService } from 'services';
import type { ICourseData } from 'services/course.service';
import type { IUserData } from 'services/user.service';

import { URLSections } from 'router';

import classes from './FreeForm.module.scss';

export default FreeForm;

interface IProps {
  user: IUserData
  course: ICourseData
  option: keyof ICourseData['productOptions']
}

function FreeForm(props: IProps) {
  const { user, course, option } = props;
  const navigate = useNavigate();
  const [errorTxt, setErrorTxt] = useState('');
  return (
    <div className={classes.btnWrapper}>
      <button
        className={classes.btn}
        onClick={() => handleSubmit({ user, course, option, navigate, onError: setErrorTxt })}
      >
        Начать учиться бесплатно
      </button>
      {errorTxt && <div>{errorTxt}</div>}
    </div>
  );
}

async function handleSubmit(props: IProps & { navigate: NavigateFunction, onError: (error: string) => void }) {
  try {
    await submitFreeOrderAndGrandAccess(props);
    props.navigate(URLSections.Course.Lessons.to({ courseId: props.course.id }));
  } catch (e) {
    const error = e as Error;
    props.onError(error.message);
  }
}

async function submitFreeOrderAndGrandAccess(props: IProps) {
  const { user, course, option } = props;
  try {
    if (!await dataService.order.exists(course.id, user.email)) {
      await dataService.order.create({
        userFromForm: { email: user.email },
        courseData: course,
        userData: user,
        chosenProductOptionType: option,
      });
    }

    // TEMP
    await dataService.access.add(course.id, user.email, 'FREE');
    await dataService.userCourseProgress.init(course.id, user.email);
  } catch (e) {
    const error = e as Error;
    // tslint:disable-next-line: no-console
    console.error('Failed to submit free order and grand access', error);
    throw new Error('Failed to submit free order and grand access');
  }
}
