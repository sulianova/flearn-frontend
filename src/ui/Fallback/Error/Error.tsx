import Page, { EPageVariant } from 'ui/Page/Page';
import Icon from 'ui/Icon/Icon';

interface Iprops {
  text: string
  error?: Error
}

export default function OtherError(props: Iprops) {
  const content = (
    <>
      <div><Icon icon='Error404'/></div>
      {props.text && <p>{props.text}</p>}
      {props.error && props.error.message}
    </>
  );

  return (
    <Page variant={EPageVariant.Fallback} header footer>
      {content}
    </Page>
  );
}
