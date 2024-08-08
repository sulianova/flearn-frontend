import type { ICourseData } from 'services/course.service';

import { i18n } from 'shared/translations';

import Card from './components/Card';
import JoinTelegramCard from './components/JoinTelegramCard';
import Layout from './components/Layout';

import type { IEmailContact } from '../types';

export interface IWelcomeToDummyCourseEmailProps {
  to: IEmailContact
  course: ICourseData
}

WelcomeToDummyCourse.getSubject = function(props: IWelcomeToDummyCourseEmailProps) {
  return i18n.t(`emails.WelcomeToDummyCourse.subject.${props.course.type}`, { title: props.course.title });
}

export default function WelcomeToDummyCourse(props: IWelcomeToDummyCourseEmailProps) {
  const { course, to } = props;
  const courseType = i18n.t(`courseType.${course.type}`);

  const mainCard = (
    <Card
      content={[
        {
          paddingTop: 5,
          paddingBottom: 20,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 32, lineHeight: '38px', color: '#000000' }}>
                <span>Вы оставили заявку на {courseType} </span>
                <span style={{ color: '#262626' }}>«{course.title}»</span>
              </td>
            </tr>
          ),
        },
        {
          paddingBottom: 30,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize:16, lineHeight: '20px', color: '#000000' }}>
                <span>
                  Пока курс находится в разработке.
                  <br/>
                  Когда он будет готов мы с вами свяжемся.
                </span>
              </td>
            </tr>
          ),
        },
      ]}
    />
  );

  return (
    <Layout
      title='Вы оставили заявку на курс'
      to={to}
      gapPx={20}
      content={[
        mainCard,
        <JoinTelegramCard/>,
      ]}
    />
  );
}
