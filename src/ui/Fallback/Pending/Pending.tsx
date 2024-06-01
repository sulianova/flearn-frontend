import Page, { EPageVariant } from 'ui/Page/Page';
import Spinner from 'ui/Spinner/Spinner';
import InPageFallback from '../InPageFallback/InPageFallback';

interface IProps {
  text?: string
  fullPage?: boolean
}

export default function Pending(props: IProps) {
  const { fullPage = true } = props;
  const content = (
    <>
      <Spinner variant='global'/>
      {props.text && <p>{props.text}</p>}
    </>
  );

  if (fullPage) {
    return (
      <Page variant={EPageVariant.Fallback} header footer>
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
