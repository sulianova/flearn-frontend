interface IProps {
  title: string
  src: string
}

export default function Iframe(props: IProps) {
  return (<iframe src={props.src} title={props.title}/>);
}
