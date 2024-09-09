import classNames from 'classnames/bind';

import type { ICourseFeedback } from 'services/course.service';
import Item from './Item/Item';
import classes from './SocialValidation.module.scss';

export default SocialValidation;

const cx = classNames.bind(classes);

interface IProps {
  feedbacks: ICourseFeedback[]
}

function SocialValidation({ feedbacks }: IProps) {
  return (
    <>
          <h2 className={cx({ sectionTitle: true })} >100+ учеников любят flearn</h2>
      <div className={classes.list}>
        {feedbacks.map((feedback, index) =>
          <Item key={index} feedback={feedback}/>
        )}
      </div>
    </>
  );
}