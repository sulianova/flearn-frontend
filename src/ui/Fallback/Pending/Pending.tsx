import Page from 'ui/Page/Page';

interface IProps {
  text?: string
}

export default function Pending(props: IProps) {
  return (
    <Page header footer wrapper='Fallback'>
      {props.text && <p>{props.text}</p>}
      <p>Some future spinner</p>
    </Page>
  );
}
