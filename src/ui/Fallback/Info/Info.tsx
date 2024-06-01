import Page, { EPageVariant } from 'ui/Page/Page';
import InPageFallback from '../InPageFallback/InPageFallback';

interface IProps {
  children: React.ReactNode
  fullPage?: boolean
}

export default function Info(props: IProps) {
  const { fullPage = true } = props;

  if (fullPage) {
    return (
      <Page variant={EPageVariant.Fallback} header footer>
        {props.children}
      </Page>
    );
  }

  return (
    <InPageFallback>
      {props.children}
    </InPageFallback>
  );
}
