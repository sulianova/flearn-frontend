import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';

import { authService } from 'services';
import { ICourseData } from 'services/course.service';
import { dataService } from 'services/data.service';
import { emailService } from 'services/email.service';
import { formatI18nT } from 'shared';

import InputField from 'ui/Form/Input/InputField';
import Link from 'ui/Link/Link';
import Spinner from 'ui/Spinner/Spinner';
import Icon from 'ui/Icon/Icon';

import classes from './Form.module.scss';
import classesInputField from './InputField.module.scss';
import { useNavigate } from 'react-router';
import { URLSections } from 'router';
import { lessonService } from 'services/lesson.service';
import { userAccessService } from 'services/userAccess.service';
import { analyticsService } from 'services/analytics.service';

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInputField);
const t = formatI18nT('courseLanding.form');

interface IFormData {
  email: string
  state: { type: 'Idle' } |  { type: 'Pending' } | { type: 'Success' } | { type: 'Error', error: Error }
}

const initialFormData: IFormData = { email: '', state: { type: 'Idle' } };

interface IProps {
  onOrderCreated: (props: { email: string }) => void
  course: ICourseData
  option: keyof ICourseData['productOptions']
}

export default function Form({ onOrderCreated, course, option }: IProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>(() => authService.user ? ({ ...initialFormData, email: authService.user.email! }) : initialFormData);
  const [orderIsCreated, setOrderIsCreated] = useState(false);
  const handleSubmit = useCallback((formData: IFormData) => submit({ formData, setFormData, course, option }), [course]);

  useEffect(() => {
    if (formData.state.type === 'Success') {
      onOrderCreated({ email: formData.email });
      setOrderIsCreated(true);
    }
  }, [formData, onOrderCreated]);

  if (orderIsCreated && !course.isUnderDevelopment) {
    return (
      <button
        className={classes.btn}
        onClick={() =>
          Promise.all([
            lessonService.fetch({ courseId: course.id, topicOrder: 1, orderInTopic: 1 }).then(lessons => lessons.at(0)),
            authService.authenticate(),
          ])
          .then(([firstLesson]) => {
            analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy });
            if (firstLesson) {
              navigate(URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id }));
            } else {
              navigate(URLSections.Profile.to({ courseId: course.id }));
            }
          })
        }
      >
        <div className={classes.content}>
          <Icon icon='Google'/>
          Продолжить с Google
        </div>
      </button>
    );
  }

  if (orderIsCreated && course.isUnderDevelopment) {
    return null;
  }

  return (
    <>
      <form
        className={classes.form}
        onSubmit={isValid(formData) ? () => handleSubmit(formData) : undefined}
      >
          <InputField
            className={cx2({ input: true, isError: formData.state.type === 'Error', isValid: isValid(formData) })}
            variant='Email'
            value={formData.email}
            onChange={v => setFormData(d => ({ ...d, email: v }))}
          />
          <button
            className={cx({ submitButton: true, [`is${formData.state.type}`]: true })}
            type="submit"
            disabled={!isValid(formData)}
            onClick={() => handleSubmit(formData)}
          >
            <span className={classes.btnSvg}>
              {
                formData.state.type === 'Idle' ?  <>Начать учиться бесплатно</>:
                formData.state.type === 'Pending' ? <Spinner/> :
                formData.state.type === 'Success' ?  <Icon icon='Tick'/>  :
                formData.state.type === 'Error' ? <Icon icon='Refresh'/> : ''
              }
            </span>
          </button>
        {formData.state.type === 'Error' && <span className={classes.Error}>{formData.state.error.message}</span>}
        <div className={classes.agreement}>
                    <Link
                      className='s-hoverable'
                      to={URLSections.Static.Oferta.index}
                      target='_blank'
                    >
                      <span className={classes.agreementText}>
                        {t('agreement')}
                      </span>
                    </Link>
                </div>
      </form>
    </>
  );
}

function isValid(formData: IFormData) {
  const { email, state } = formData;
  return email && state.type !== 'Pending';
}

async function submit(props: {
  formData: IFormData,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
  course: ICourseData,
  option: keyof ICourseData['productOptions'],
}) {
  const { formData, setFormData, course, option } = props;
  setFormData(d => ({ ...d, state: { type: 'Pending' } }));
  try {
    await dataService.order.create({
      userFromForm: { email: formData.email },
      courseData: course,
      userData: undefined,
      chosenProductOptionType: option,
    }).catch(_err => { /* do nothing */});

    if (course.isUnderDevelopment) {
      await emailService.sendEmail({
        type: emailService.EEmail.WantToBuyDummyCourse,
        course: { isDummy: false, ...course },
        requester: { email: formData.email },
      });
      await emailService.sendEmail({
        type: emailService.EEmail.WelcomeToDummyCourse,
        to: { email: formData.email },
        course: course,
      });
    } else {
      await userAccessService.add(course.id, formData.email, 'FREE');
      await emailService.sendEmail({
        type: emailService.EEmail.WelcomeToCourse,
        to: { email: formData.email },
        course,
      });
    }
    analyticsService.logEvent({ type: analyticsService.event.GenerateLead });
    setFormData(d => ({ ...d, state: { type: 'Success' } }));
  } catch (e) {
    setFormData(d => ({ ...d, state: { type: 'Error', error: e as Error } }));
  }
}
