import Animated from 'ui/Animated';
import Text from 'ui/Text/Text';

import classNames from 'classnames/bind';
import classes from './Item.module.scss';

import type { TText } from 'types';

const cx = classNames.bind(classes);

interface IProps {
  author: {
    name: string
    description?: string
  }
  quote: TText | TText[]
  excerpt?: TText | TText[]
}

export default function Item(props: IProps) {
  return (
    <Animated.Scroll>
      {(id, className) => (
        <div className={cx({ _: true }, className)} id={id}>
          <div className={classes.feedbackAuthor}>
            {props.author.description ? (
              <>
                <strong>{props.author.name},</strong>
                {props.author.description}
              </>
              ) : <strong>{props.author.name}</strong>
            }
          </div>
          <div className={classes.feedbackQuote}>
            <Text text={props.quote}/>
          </div>
          {props.excerpt && (
            <div className={classes.feedbackExcerpt}>
              <Text text={props.excerpt}/>
            </div>
          )}
        </div>
      )}
    </Animated.Scroll>
  );
}
