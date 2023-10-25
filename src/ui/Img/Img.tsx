import classnames from 'classnames/bind';
import { useLayoutEffect, useState } from 'react';

import classes from './Img.module.scss';

const cx = classnames.bind(classes);

export default Img;

interface IProps {
  alt: string
  src: string
  lazy?: boolean
  className?: string
}

function Img(props: Readonly<IProps>) {
  const { alt, src, lazy = true, className } = props;

  const [imgStatus, setImgStatus] = useState<null | 'loaded' | 'failed'>(null);

  useLayoutEffect(() => {
      setImgStatus(null);
  }, [src]);

  if (src && src.length > 0 && imgStatus !== 'failed') {
    return (
      <img
        alt={alt}
        src={src}
        className={cx(className, { Hidden: imgStatus !== 'loaded' })}
        loading={lazy ? 'lazy' : undefined }
        onLoad={() => {
          console.log('onLoad');
          setImgStatus('loaded')
        }}
        onError={() => {
          console.log('onFailed');
          setImgStatus('failed')
        }}
      />
    );
  }

  return (
    <div className={cx(className, { Placeholder: true })}/>
  )
}
