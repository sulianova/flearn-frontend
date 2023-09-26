import * as images from 'assets/images';

interface IProps {
  alt: string
  src: keyof typeof images
  lazy?: boolean
}

export default function Img(props: Readonly<IProps>) {
  const { alt, src, lazy = true } = props;
  return (
    <img
      alt={alt}
      src={images[src]}
      loading={lazy ? 'lazy' : undefined }
    />
  );
}
