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

  if (text.tag === 'br' ) {
    return (<br/>);
  }

  const { tag, content, props } = text;

  switch(tag) {
    case 'p':
      return (<p {...props}><Text text={content}/></p>);
    case 'a':
      return (<Link {...props}><Text text={content}/></Link>);
    case 'span':
      return (<span {...props}><Text text={content}/></span>);
    case 'strong':
      return (<strong {...props}><Text text={content}/></strong>);
  }
}
