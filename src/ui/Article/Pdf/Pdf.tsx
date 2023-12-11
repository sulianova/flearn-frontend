import { getFileExtension } from 'utils';
import classes from './Pdf.module.scss';
import { useEffect, useRef } from 'react';

// // @ts-ignore
// import pdfJS from 'pdf.js';

import pdfJS from 'pdfjs-dist';

export default PDF;

interface IProps {
  src: string
  alt: string // same as originalName
  originalName: string
}

function PDF(props: IProps) {
  const { src, originalName } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		(async function () {
			// We import this here so that it's only loaded during client-side rendering.
			// const pdfJS = await import('pdfjs-dist/build/pdf');

			pdfJS.GlobalWorkerOptions.workerSrc =
				window.location.origin + '/pdf.worker.min.js';
			const pdf = await pdfJS.getDocument(src).promise;

			const page = await pdf.getPage(1);
			const viewport = page.getViewport({ scale: 1.5 });

			// Prepare canvas using PDF page dimensions.
			const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

			const canvasContext = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

      if (!canvasContext) {
        return;
      }
			// Render PDF page into canvas context.
			const renderContext = { canvasContext, viewport };
			page.render(renderContext);
		})();
	}, []);

  if (getFileExtension(originalName) !== 'pdf') {
    return null;
  }

	return <canvas ref={canvasRef} style={{ height: '100vh' }} />;

  // return (
  //   <div className={classes._}>
  //     <iframe src={src} title={originalName} width="100%" height="500px"/>
  //     {/* <object data={src} width="800" height="500"/>  */}
  //     {/* <embed src={src} width="800px" height="2100px" /> */}
  //   </div>
  // );
}
