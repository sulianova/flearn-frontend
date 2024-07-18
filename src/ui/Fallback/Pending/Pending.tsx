import Page, { EPageVariant } from 'ui/Page/Page';
import Spinner from 'ui/Spinner/Spinner';
import InPageFallback from '../InPageFallback/InPageFallback';

interface IProps {
  text?: string
  fullPage?: boolean
  headerVariant?: EPageVariant
}

export default function Pending(props: IProps) {
  const { fullPage = true, headerVariant } = props;
  const content = (
    <>
      <Spinner variant='global'/>
      {props.text && <p>{props.text}</p>}
    </>
  );

  if (fullPage) {
    return (
      <Page variant={EPageVariant.Fallback} header={headerVariant ?? true} footer>
        {content}
      </Page>
    );
  }

  return (
    <InPageFallback>
      {content}
    </InPageFallback>
  );
}
