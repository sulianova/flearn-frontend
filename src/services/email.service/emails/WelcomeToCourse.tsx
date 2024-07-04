import type { ICourseData } from 'services/course.service';
import type { ILessonData } from 'services/lesson.service';

import { i18n } from 'shared/translations';
import { URLSections } from 'router';

import Button from './components/Button';
import Card from './components/Card';
import JoinTelegramCard from './components/JoinTelegramCard';
import Layout from './components/Layout';

export interface IWelcomeToCourseEmailProps {
  course: ICourseData
  firstLesson: ILessonData | undefined
}

WelcomeToCourse.getSubject = function(props: IWelcomeToCourseEmailProps) {
  return i18n.t(`emails.WelcomeToCourse.subject.${props.course.type}`, { title: props.course.title });
}

export default function WelcomeToCourse(props: IWelcomeToCourseEmailProps) {
  const { course, firstLesson } = props;
  const courseType = i18n.t(`courseType.${course.type}`);
  const startLink = firstLesson
    ? URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id, full: true })
    : URLSections.Profile.to({ courseId: course.id, full: true });
  
  const mainCard = (
    <Card
      content={[
        {
          paddingTop: 5,
          paddingBottom: 20,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 32, lineHeight: '38px', color: '#000000' }}>
                <span>Добро пожаловать на {courseType} </span>
                <span style={{ color: '#262626' }}>«{course.title}»</span>
              </td>
            </tr>
          ),
        }, {
          paddingBottom: 30,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize:16, lineHeight: '20px', color: '#000000' }}>
                <span>
                  Перед тем, как приступить к&nbsp;основному курсу, мы&nbsp;предлагаем всем
                  студентам пройти бесплатную вводную часть.
                  <br/>
                  <br/>
                  За&nbsp;10&nbsp;часов
                  <br/>
                  <br/>
                  → познакомитесь с&nbsp;форматом обучения в&nbsp;flearn
                  <br/>
                  <br/>
                  → пройдете ключевые этапы работы над иллюстрацией
                  <br/>
                  <br/>
                  → нарисуете обложку к любимой песне
                </span>
              </td>
            </tr>
          ),
        }, {
          paddingBottom: 5,
          value: (
            <tr>
              <td align="left">
                <Button href={startLink}>
                  Начать учиться
                </Button>
              </td>
            </tr>
          )
        }
      ]}
    />
  );

  return (
    <Layout
      title='Добро пожаловать на вводную часть'
      gapPx={20}
      content={[
        mainCard,
        <JoinTelegramCard/>,
      ]}
    />
  );
}
