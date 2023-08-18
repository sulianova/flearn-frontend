import Page from 'ui/Page/Page';

interface Iprops {
  text?: string
  error?: Error
}

export default function OtherError(props: Iprops) {
  return (
    <Page header footer wrapper='Fallback'>
      <p>Error</p>
      {props.text && <p>{props.text}</p>}
      {props.error && props.error.message}
    </Page>
  );
}
