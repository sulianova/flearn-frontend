import { useState } from 'react';
import { useNavigate } from 'react-router';

import { URLSections } from 'router';
import type { ICourseData } from 'services/course.service';
import { authService, dataService } from 'services';
import { emailService } from 'services/email.service';
import { analyticsService } from 'services/analytics.service';
import { lessonService } from 'services/lesson.service';
import { userCourseProgressService } from 'services/userCourseProgress.service';
import { formatI18nT } from 'shared';

import Icon from 'ui/Icon/Icon';
import GeneralPopup from 'ui/GeneralPopup/GeneralPopup';

const t = formatI18nT('SignupToCoursePopup');

interface IProps {
  course: ICourseData
  option: keyof ICourseData['productOptions']
  close: () => void
}

export default function SignupToCoursePopup(props: Readonly<IProps>) {
  const { course, option, close } = props;

  const navigate = useNavigate();
  const firstLesson = lessonService.useLessons({ courseId: course.id, topicOrder: 1, orderInTopic: 1 }).at(0);

  const [orderEmail, setOrderEmail] = useState<string | null>(null);

  if (!orderEmail) {
    return (
      <GeneralPopup
        close={close}
      >
        {classes => (
          <>
            <div className={classes.header}>
              <div className={classes.cx({ title: true, title_start: true })}>
                {t('titleEmailForm')}
              </div>
            </div>
            <GeneralPopup.EmailForm
              submitText={t('submitEmail')}
              handleSubmit={email =>
                handleEmailSubmit({ email, course, option })
                  .then(() => setOrderEmail(email))
              }
            />
            <GeneralPopup.Oferta/>
          </>
        )}
      </GeneralPopup>
    );
  }

  if (orderEmail && course.isUnderDevelopment) {
    return null;
  }

  return (
    <GeneralPopup
      close={props.close}
    >
      {classes => (
        <>
          <GeneralPopup.Img iconProps={{ icon: 'EmailSent' }}/>
          <div className={classes.header}>
            <div className={classes.cx({ title: true, title_center: true })}>
              {t('titleEmailFormSubmitted', { email: orderEmail })}
            </div>
          </div>
          <GeneralPopup.Btn
              onClick={() =>
                authService.authenticate()
                  .then(() => {
                    analyticsService.logEvent({ type: analyticsService.event.ButtonClickedStartStudy });
                    if (firstLesson) {
                      navigate(URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id }));
                    } else {
                      navigate(URLSections.Profile.to({ courseId: course.id }));
                    }
                  })
              }
          >
            <Icon icon='Google'/>
            {t('login')}
          </GeneralPopup.Btn>
          <GeneralPopup.Oferta/>
        </>
      )}
    </GeneralPopup>
  );
}

async function handleEmailSubmit(props: { email: string, course: ICourseData, option: keyof ICourseData['productOptions'] }) {
  const { email, course, option } = props;
  await dataService.order.create({
    userFromForm: { email },
    courseData: course,
    userData: undefined,
    chosenProductOptionType: option,
  }).catch(_err => { /* do nothing */});

  if (course.isUnderDevelopment) {
    await Promise.all([
      emailService.sendEmail({
        type: emailService.EEmail.WantToBuyDummyCourse,
        course: { isDummy: false, ...course },
        requester: { email },
      }),
      emailService.sendEmail({
        type: emailService.EEmail.WelcomeToDummyCourse,
        to: { email },
        course: course,
      }),
    ]);
  } else {
    await Promise.all([
      emailService.sendEmail({
        type: emailService.EEmail.WelcomeToCourse,
        to: { email },
        course,
      }),
      lessonService.fetch({ courseId: course.id, topicOrder: 1, orderInTopic: 1 })
        .then(async lessons => {
          const lesson = lessons.at(0);
          if (lesson) {
            await userCourseProgressService.saveLessonProgress({ courseId: course.id, lessonId: lesson.id, userEmail: email, unlockedBlocks: 0 })
          }
        })
    ]);
  }
  analyticsService.logEvent({ type: analyticsService.event.GenerateLead });
}
