import Page, { EPageVariant } from 'ui/Page/Page';
import InPageFallback from '../InPageFallback/InPageFallback';
import Icon from 'ui/Icon/Icon';

interface Iprops {
  text?: string
  error?: Error
  fullPage?: boolean
}

export default function OtherError(props: Iprops) {
  const { fullPage = true } = props;
  const content = (
    <>
      <div><Icon icon='Error404'/></div>
      {props.text && <p>{props.text}</p>}
      {props.error && props.error.message}
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
