import Page from 'ui/Page/Page';
import InPageFallback from '../InPageFallback/InPageFallback';

interface Iprops {
  text?: string
  error?: Error
  fullPage?: boolean
}

export default function OtherError(props: Iprops) {
  const { fullPage = true } = props;
  const content = (
    <>
      <p>Error</p>
      {props.text && <p>{props.text}</p>}
      {props.error && props.error.message}
    </>
  );

  if (fullPage) {
    return (
      <Page header footer wrapper='Fallback'>
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
