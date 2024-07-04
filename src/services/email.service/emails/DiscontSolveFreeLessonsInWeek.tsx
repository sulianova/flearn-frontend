import type { ICourseData } from 'services/course.service';
import { i18n } from 'shared';

import Card from './components/Card';
import Layout from './components/Layout';

export interface IDiscontSolveFreeLessonsInWeekProps {
  course: ICourseData
}

DiscontSolveFreeLessonsInWeek.getSubject = function(props: IDiscontSolveFreeLessonsInWeekProps) {
  return i18n.t(`emails.DiscontSolveFreeLessonsInWeek.subject.${props.course.type}`, { title: props.course.title });
}

export default function DiscontSolveFreeLessonsInWeek(props: IDiscontSolveFreeLessonsInWeekProps) {
  const mainCard = (
    <Card
      content={[
        {
          value: (
            <tr>
              <td>
                Пройдите бесплатную часть за неделю и получите скидку 15% на курс
              </td>
            </tr>
          ),
        }
      ]}
    />
  );

  return (
    <Layout
      title='DiscontSolveFreeLessonsInWeek'
      content={[
        mainCard,
      ]}
    />
  );
}
