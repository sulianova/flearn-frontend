import Page from 'ui/Page/Page';
import Spinner from 'ui/Spinner/Spinner';

interface IProps {
  text?: string
}

export default function Pending(props: IProps) {
  return (
    <Page header footer wrapper='Fallback'>
        <Spinner variant='global'/>
        {props.text && <p>{props.text}</p>}
    </Page>
  );
}
