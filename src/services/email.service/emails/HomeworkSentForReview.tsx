import type { ICourseData } from 'services/course.service';
import type { ILessonData } from 'services/lesson.service';
import { i18n } from 'shared';

import Card from './components/Card';
import Layout from './components/Layout';

export interface IHomeworkSentForReviewProps {
  course: ICourseData
  lesson: ILessonData
}
 
HomeworkSentForReview.getSubject = function(props: IHomeworkSentForReviewProps) {
  return i18n.t(`emails.HomeworkSentForReview.subject.${props.course.type}`, { title: props.course.title });
}

export default function HomeworkSentForReview(props: IHomeworkSentForReviewProps) {
  const mainCard = (
    <Card
      content={[
        {
          value: (
            <tr>
              <td>
                Мы получили ваше задание, преподаватель проверит его в течении 2-3 дней. И мы пришлем письмо с ссылкой на ревью
              </td>
            </tr>
          ),
        }
      ]}
    />
  );

  return (
    <Layout
      title='HomeworkSentForReview'
      content={[
        mainCard,
      ]}
    />
  );
}
