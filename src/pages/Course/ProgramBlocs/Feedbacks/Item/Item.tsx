import type { ICourseFeedback } from 'services/course.service';

import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import classNames from 'classnames/bind';
import classes from './Item.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  feedback: ICourseFeedback
}

export default function Item({ feedback }: IProps) {
  return (
    <Animated.Scroll>
      {(id, className) => (
        <div className={cx({ _: true }, className)} id={id}>
          <div className={classes.feedbackAuthor}>
            {feedback.author.description ? (
              <>
                <span>{feedback.author.name},</span>
                {feedback.author.description}
              </>
              ) : <span>{feedback.author.name}</span>
            }
          </div>
          <div className={classes.feedbackQuote}>
            <Text text={feedback.quote}/>
          </div>
          {feedback.excerpt && (
            <div className={classes.feedbackExcerpt}>
              <Text text={feedback.excerpt}/>
            </div>
          )}
        </div>
      )}
    </Animated.Scroll>
  );
}
