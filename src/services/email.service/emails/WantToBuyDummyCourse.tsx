import type { ICourseCardInfo } from 'services/course.service';

import { i18n } from 'shared/translations';

import Card from './components/Card';
import Layout from './components/Layout';
import type { IEmailContact } from '../types';

export interface IWantToBuyDummyCourseEmailProps {
  to: IEmailContact
  course: ICourseCardInfo
  requester?: { email: string, displayName?: string | null }
}

WantToBuyDummyCourse.getSubject = function(props: IWantToBuyDummyCourseEmailProps) {
  return i18n.t(`emails.WantToBuyDummyCourse.subject.${props.course.type}`, { title: props.course.title });
}

export default function WantToBuyDummyCourse(props: IWantToBuyDummyCourseEmailProps) {
  const { course, requester, to } = props;
  const courseType = i18n.t(`courseType.${course.type}`);
  
  const mainCard = (
    <Card
      content={
        [
          {
            paddingTop: 5,
            paddingBottom: 20,
            value: (
              <tr>
                <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 32, lineHeight: '38px', color: '#000000' }}>
                  <span>Есть запрос на {courseType} </span>
                  <span style={{ color: '#262626' }}>«{course.title}»</span>
                </td>
              </tr>
            ),
          },
          requester ?
          {
            paddingBottom: 30,
            value: (
              <tr>
                <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize:16, lineHeight: '20px', color: '#000000' }}>
                  <span>
                    {requester.displayName
                      ? `Запросил юзер "${requester.displayName}" (${requester.email})`
                      : `Запросил юзер ${requester.email}`
                    }
                  </span>
                </td>
              </tr>
            ),
          } : undefined,
        ].filter(c => c !== undefined)
      }
    />
  );

  return (
    <Layout
      title='Есть запрос на курс'
      to={to}
      gapPx={20}
      content={[
        mainCard,
      ]}
    />
  );
}
