import type { ICourseFeedback } from 'services/course.service';

import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import Icon from 'ui/Icon/Icon';
import classNames from 'classnames/bind';
import classes from './Item.module.scss';

const cx = classNames.bind(classes);

interface IProps {
  feedback: ICourseFeedback
}

export default function Item({ feedback }: IProps) {
  return (
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedbackQuote}>
            <Text text={feedback.quote}/>
            {feedback.author.description ? (
              <div className={classes.feedbackAuthor}>
                <span>{feedback.author.name},</span>
                {feedback.author.description}
              </div>
              ) : <span>{feedback.author.name}</span>
            }
          </div>
        </div>
  );
}
