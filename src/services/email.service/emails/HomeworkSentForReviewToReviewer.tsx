import type { ICourseData } from 'services/course.service';
import type { ILessonData } from 'services/lesson.service';
import type { IUserData } from 'services/user.service';
import { i18n } from 'shared';

import Card from './components/Card';
import Layout from './components/Layout';

import type { IHomeworkData } from 'services/homework.service';

export interface IHomeworkSentForReviewToReviewerProps {
  course: ICourseData
  lesson: ILessonData
  homework: IHomeworkData
  homeworkUser: IUserData
}

HomeworkSentForReviewToReviewer.getSubject = function(props: IHomeworkSentForReviewToReviewerProps) {
  return i18n.t(`emails.HomeworkSentForReviewToReviewer.subject.${props.course.type}`, { title: props.course.title });
}

export default function HomeworkSentForReviewToReviewer(props: IHomeworkSentForReviewToReviewerProps) {
  const { course, lesson, homework, homeworkUser } = props;
  const mainCard = (
    <Card
      content={[
        {
          value: (
            <tr>
              <td>
                <div>Пользователь {homeworkUser.email} отправил на проверку домашнее задание по курсу "{course.title}" по уроку "{lesson.title}".</div>
                <div>Посмотреть домашнее задание можно по ссылке {homework.externalHomeworkLink}.</div>
                <div>{`После ревью в консоле сайта напишите 'window.homeworkService.submitReview({ homeworkId: '${homework.id}', reviewLink: '${homework.externalHomeworkLink}' })'.`}</div>
              </td>
            </tr>
          ),
        }
      ]}
    />
  );

  return (
    <Layout
      title='HomeworkSentForReviewToReviewer'
      content={[
        mainCard,
      ]}
    />
  );
}
