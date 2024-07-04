import type { ICourseData } from 'services/course.service';
import type { ILessonData } from 'services/lesson.service';
import type { IUserData } from 'services/user.service';
import { i18n } from 'shared';

import Card from './components/Card';
import Layout from './components/Layout';

export interface IHomeworkReviewedToReviewerProps {
  course: ICourseData
  lesson: ILessonData
  homeworkUser: IUserData
  reviewLink: string
}

HomeworkReviewedToReviewer.getSubject = function(props: IHomeworkReviewedToReviewerProps) {
  return i18n.t(`emails.HomeworkReviewedToReviewer.subject.${props.course.type}`, { title: props.course.title });
}

export default function HomeworkReviewedToReviewer(props: IHomeworkReviewedToReviewerProps) {
  const { course, lesson, homeworkUser, reviewLink } = props;
  const mainCard = (
    <Card
      content={[
        {
          value: (
            <tr>
              <td>
                Вы уведомили пользователя {homeworkUser.email}, о том, что его домашнее задание по курсу "{course.title}" по уроку "{lesson.title}" проверено.
              </td>
            </tr>
          ),
        }
      ]}
    />
  );

  return (
    <Layout
      title='HomeworkReviewedToReviewer'
      content={[
        mainCard,
      ]}
    />
  );
}
