import Page, { EPageVariant } from 'ui/Page/Page';

import classes from '../Fallback.module.scss';

interface IProps {
  children: React.ReactNode
  variant: EPageVariant
}

export default function Info(props: IProps) {
  const { children, variant } = props;

  return (
    <Page variant={variant} header footer>
      <div className={classes._}>
        {children}
      </div>
    </Page>
  );
}
