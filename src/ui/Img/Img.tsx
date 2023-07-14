import * as images from 'assets/images';

interface IProps {
  alt: string
  src: keyof typeof images
}

export default function Img(props: IProps) {
  return (<img alt={props.alt} src={images[props.src]} />);
}
