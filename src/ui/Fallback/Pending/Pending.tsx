import Page, { EPageVariant } from 'ui/Page/Page';
import Spinner from 'ui/Spinner/Spinner';

import classes from '../Fallback.module.scss';

interface IProps {
  text?: string
  variant: EPageVariant
}

export default function Pending(props: IProps) {
  const { variant, text } = props;
  const content = (
    <>
      <Spinner variant='global'/>
      {text && <p>{text}</p>}
    </>
  );

  return (
    <Page variant={variant} header footer>
      <div className={classes._}>
        {content}
      </div>
    </Page>
  );
}
