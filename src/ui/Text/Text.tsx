import { TText } from 'types';
import Link from 'ui/Link/Link';

interface IProps {
  text: TText | TText[]
}

export default function Text({ text }: IProps) {
  if (typeof text === 'string') {
    return <>{text}</>;
  }

  if (Array.isArray(text)) {
    return (
      <>{text.map((t, i) => <Text key={i} text={t}/>)}</>
    );
  }

  const { tag, content, props } = text;

  switch(tag) {
    case 'p':
      return (<p {...props}><Text text={content}/></p>);
    case 'a':
      return (<Link {...props}><Text text={content}/></Link>);
    default:
      return (<span><Text text={content}/></span>);
  }
}
