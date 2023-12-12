import classnames from 'classnames/bind';
import{ useLayoutEffect, useState } from 'react';

import classes from './Img.module.scss';

const cx = classnames.bind(classes);

export default Img;

interface IProps {
  alt: string
  src: string | { mobile: string, desktop: string }
  lazy?: boolean
  className?: string | { mobile: string, desktop: string }
  placeholder?: JSX.Element
}

function Img(props: Readonly<IProps>) {
  const { alt, src, lazy = true, className } = props;

  const [imgStatus, setImgStatus] = useState<null | 'loaded' | 'failed'>(null);

  useLayoutEffect(() => {
      setImgStatus(null);
  }, [src]);

  if (imgStatus === 'failed') {
    if (props.placeholder) {
      return props.placeholder;
    }

    return (
      <div className={cx(className, { Placeholder: true })}/>
    );
  }

  if (typeof src === 'string') {
    return (
      <img
        alt={alt}
        src={src}
        className={cx(className, { Hidden: imgStatus !== 'loaded' })}
        loading={lazy ? 'lazy' : undefined }
        onLoad={() => setImgStatus('loaded')}
        onError={() => setImgStatus('failed')}
      />
    );
  }

  const desktopClassName = typeof className === 'string' ? className : className?.desktop;
  const mobileClassName = typeof className === 'string' ? className : className?.mobile;

  return (
    <>
      <img
        alt={alt}
        src={src.desktop}
        className={cx(desktopClassName, { Desktop: true, Hidden: imgStatus !== 'loaded' })}
        loading={lazy ? 'lazy' : undefined }
        onLoad={() => setImgStatus('loaded')}
        onError={() => setImgStatus('failed')}
      />
      <img
        alt={alt}
        src={src.mobile}
        className={cx(mobileClassName, { Mobile: true, Hidden: imgStatus !== 'loaded' })}
        loading={lazy ? 'lazy' : undefined }
        onLoad={() => setImgStatus('loaded')}
        onError={() => setImgStatus('failed')}
      />
    </>
  );
}
