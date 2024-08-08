import { createPortal } from 'react-dom';

import classes from './EditBar.module.scss';

interface IProps {
  source: 'remote' | 'local'
  handleSourceChange: (source: 'remote' | 'local') => void
  handleUpload?: () => void
  handleDownload?: () => void
}
export default function EditBar(props: Readonly<IProps>) {
  const { source, handleSourceChange } = props;
  return createPortal((
    <section className={classes._}>
      <div className={classes.stickyBtnStaff}>
        <div className={classes.stickyBtnShaftInner}>
          {props.handleUpload && (
            <div
              className={classes.stickyBtn + ' s-text-24'}
              onClick={props.handleUpload}
            >
              Upload
            </div>
          )}
          {props.handleDownload && (
            <div
              className={classes.stickyBtn + ' s-text-24'}
              onClick={props.handleDownload}
            >
              Download
            </div>
          )}
          <div
            className={classes.stickyBtn + ' s-text-24'}
            onClick={() => handleSourceChange(source === 'local' ? 'remote' : 'local')}
          >
            {`use ${source === 'local' ? 'remote' : 'local'}`}
          </div>
        </div>
      </div>
    </section>
  ), document.body);
}
