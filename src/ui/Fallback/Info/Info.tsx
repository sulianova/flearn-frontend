import Page, { EPageVariant } from 'ui/Page/Page';
import InPageFallback from '../InPageFallback/InPageFallback';

interface IProps {
  children: React.ReactNode
  fullPage?: boolean
  headerVariant?: EPageVariant
}

export default function Info(props: IProps) {
  const { fullPage = true, headerVariant } = props;

  if (fullPage) {
    return (
      <Page variant={EPageVariant.Fallback} header={headerVariant ?? true} footer>
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
