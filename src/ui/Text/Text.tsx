import { TText } from 'types';

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

  const { tag, content } = text;

  switch(tag) {
    case 'p':
      return (<p><Text text={content}/></p>);
    default:
      return (<span><Text text={content}/></span>);
  }
}
