import { Fragment } from 'react';
import type { IArticleTitleBlock } from 'types';
import classes from './Title.module.scss';

export default Title;

interface IProps {
  data: IArticleTitleBlock
}

function Title(props: IProps) {
  return (
    <Fragment>
      {props.data.title && <h2 className={classes.title} data--title>{props.data.title}</h2>}
    </Fragment>
  );
}
