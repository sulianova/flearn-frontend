import type { ICourseData } from 'services/course.service';
import type { ILessonData } from 'services/lesson.service';
import { i18n } from 'shared';

import Card from './components/Card';
import Layout from './components/Layout';

export interface IHomeworkReviewedProps {
  reviewLink: string
  course: ICourseData
  lesson: ILessonData
}

HomeworkReviewed.getSubject = function(props: IHomeworkReviewedProps) {
  return i18n.t(`emails.HomeworkReviewed.subject.${props.course.type}`, { title: props.course.title });
}

export default function HomeworkReviewed(props: IHomeworkReviewedProps) {
  const { reviewLink } = props;
  const mainCard = (
    <Card
      content={[
        {
          value: (
            <tr>
              <td>
                Ваша работа проверена, по ссылке можете посмотреть ревью {reviewLink}
              </td>
            </tr>
          ),
        }
      ]}
    />
  );

  return (
    <Layout
      title='HomeworkReviewed'
      content={[
        mainCard,
      ]}
    />
  );
}
