import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

import Trash from 'assets/images/Svg/Trash';
import { dataService } from 'services';
import { formatI18nT } from 'shared';

import Spinner from 'ui/Spinner/Spinner';
import Img from 'ui/Img/Img';

import classes from './File.module.scss';

import type { TImageDataWState, TLoadingState } from '../types';
import type { IHomeworkImageData } from 'types';

export default File;

const t = formatI18nT('courseLesson.upload');

interface IProps {
  courseId: string
  lessonId: string
  userId: string
  imageDataWState: TImageDataWState
  handleDeleteImage: (props: { imageId: string }) => void
  onCaptionError: (imageData: IHomeworkImageData, error: Error) => void
}

function File(props: IProps) {
  const { loadingState, imageData } = props.imageDataWState;

  return (
    <>
      <div className={classes.deleteBtn}>
        <div className={classes.deleteBtnBackgroundWrapper}>
          <div className={classes.deleteBtnBackground}></div>
        </div>
        <div className={classes.deleteSvgWrapper}>
          <button
            type='button'
            className={classes.deleteSvg}
            onClick={() => props.handleDeleteImage({ imageId: imageData.id })}
          >
            <Trash/>
          </button>
        </div>
      </div>
      <Img className={classes.preview} src={imageData.src} alt={imageData.alt} />
      <State originalName={imageData.originalName} loadingState={loadingState} />
      <ImageCaption
        courseId={props.courseId}
        lessonId={props.lessonId}
        userId={props.userId}
        imageData={props.imageDataWState.imageData}
        loadingState={loadingState}
        onCaptionError={props.onCaptionError}
      />
    </>
  );
}

function State(props: { originalName: string, loadingState: TLoadingState }) {
  if (props.loadingState.type === 'pending') {
    return <Spinner/>;
  }

  if (props.loadingState.type === 'error') {
    return (
      <>
        <div className={classes.error}>
          {props.loadingState.error ? props.loadingState.error : 'Error'}
        </div>
        <div className={classes.originalName}>
          {props.originalName}
        </div>
      </>
    );
  }

  return null;
}

function ImageCaption(props: {
    courseId: string
    lessonId: string
    userId: string
    imageData: IHomeworkImageData
    loadingState: TLoadingState
    onCaptionError: (imageData: IHomeworkImageData, error: Error) => void
}) {
  const { imageData, courseId, lessonId, userId, onCaptionError } = props;
  const [caption, setCaption] = useState<string>(props.imageData.caption);
  const handleChange = useCallback(debounce((value: string) => {
    handleCaptionChange({
      imageId: imageData.id,
      courseId,
      lessonId,
      userId,
      caption: value,
      onError: error => onCaptionError(imageData, error),
    });
  }, 200), [imageData, courseId, lessonId, userId]);

  if (props.loadingState.type === 'error') {
    return null;
  }

  return (
    <div className={classes.addCaptionWrapper}>
      <input
        className={classes.addCaption}
        type="text"
        placeholder="Добавить описание"
        value={caption}
        onChange={e => {
          setCaption(e.target.value);
          handleChange(e.target.value);
        }}
      />
    </div>
  );
}

async function handleCaptionChange(props: { courseId: string, lessonId: string, userId: string, imageId: string, caption: string, onError?: (error: Error) => void }) {
  return dataService.homework.get(props.courseId, props.lessonId, props.userId)
    .then(hw => {
      const imageIndex = hw.images.findIndex(image => image.id === props.imageId);
      if (imageIndex === -1) {
        throw new Error('Failed to find image');
      }

      const newImage = { ...hw.images[imageIndex], caption: props.caption };

      hw.images.splice(imageIndex, 1, newImage);
      dataService.homework.patch(hw.id, { images: hw.images });
    })
    .catch(err => props.onError?.(err));
}
