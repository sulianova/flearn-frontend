interface IProps {
  title: string
  src: string
  lazy?: boolean
}

export default function Iframe(props: IProps) {
  const { src, title, lazy = true } = props;
  return (
    <iframe
       src={props.src}
       title={props.title}
       loading={lazy ? 'lazy' : undefined }
    />
  );
}
