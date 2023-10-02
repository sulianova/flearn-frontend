interface IProps {
  alt: string
  src: string
  lazy?: boolean
}

export default function Img(props: Readonly<IProps>) {
  const { alt, src, lazy = true } = props;
  return (
    <img
      alt={alt}
      src={src}
      loading={lazy ? 'lazy' : undefined }
    />
  );
}
