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

import classes from './Form.module.scss';
import classesInputField from './InputField.module.scss';
import { useNavigate } from 'react-router';
import { URLSections } from 'router';
import { lessonService } from 'services/lesson.service';

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

  if (orderIsCreated) {
    return (
      <button
        className={classes.btn}
        onClick={() =>
          Promise.all([
            lessonService.fetch({ courseId: course.id, topicOrder: 1, orderInTopic: 1 }).then(lessons => lessons.at(0)),
            authService.authenticate(),
          ])
          .then(([firstLesson]) => {
            if (firstLesson) {
              navigate(URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id }));
            } else {
              navigate(URLSections.Profile.to({ courseId: course.id }));
            }
          })
        }
      >
        Начать учиться
      </button>
    );
  }

  return (
    <>
      <form
        className={classes.form}
        onSubmit={isValid(formData) ? () => handleSubmit(formData) : undefined}
      >
        <div className={classes.inputWrap}>
          <InputField
            className={cx2({ input: true, light: true, isError: formData.state.type === 'Error' })}
            variant='Email'
            value={formData.email}
            onChange={v => setFormData(d => ({ ...d, email: v }))}
          />
          <button
            className={cx({ submitButton: true, isDisabled: !isValid(formData), [`is${formData.state.type}`]: true })}
            type="submit"
            disabled={!isValid(formData)}
            onClick={() => handleSubmit(formData)}
          >
            <span className={classes.btnSvg}>
              {
                formData.state.type === 'Idle' ? '→' :
                formData.state.type === 'Pending' ? <Spinner/> :
                formData.state.type === 'Success' ? '✓' :
                formData.state.type === 'Error' ? '\u21aa' : ''
              }
            </span>
          </button>
        </div>
        {formData.state.type === 'Error' && <span className={classes.Error}>{formData.state.error.message}</span>}
        <div className={classes.agreement}>
                    <Link
                      className='link'
                      // to={URLSections.Static.Oferta.index}
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

    await dataService.access.add(course.id, formData.email, 'FREE');
    const firstLesson = (await lessonService.fetch({ courseId: course.id, topicOrder: 1, orderInTopic: 1 })).at(0);
    await emailService.sendEmail({
      type: emailService.EEmail.WelcomeToCourse,
      to: { email: formData.email },
      course,
      firstLesson,
    });
    setFormData(d => ({ ...d, state: { type: 'Success' } }));
  } catch (e) {
    setFormData(d => ({ ...d, state: { type: 'Error', error: e as Error } }));
  }
}
