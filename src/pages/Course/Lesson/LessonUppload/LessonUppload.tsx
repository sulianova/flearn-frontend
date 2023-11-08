import classNames from 'classnames/bind';
import { debounce } from 'lodash';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { homeworkService } from 'services';
import { formatI18nT } from 'shared';

import File from './File/File';
import Input from './Input/Input';
import Textarea from './Textarea/Textarea';
import Spinner from 'ui/Spinner/Spinner';

import Upload from 'assets/images/Svg/Upload';

import classes from './LessonUppload.module.scss';

import type { TAction, TImageDataWState, TState } from './types';
import type { IHomeworkData, IHomeworkDataWPopulate, IHomeworkImageData, IRootState, IUserData } from 'types';
import { errorService } from './error.service';

export default connect(mapStateToProps)(LessonUppload);

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);
const MAX_IMAGE_SIZE_B = 3 * 1_000_000;

interface IConnectedProps {
  user: IUserData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user.user!,
  }
}

interface IProps extends IConnectedProps {
  homeworkWPopulate: IHomeworkDataWPopulate
  scroll: boolean
  onScrollEnd: () => void
}

function LessonUppload({ homeworkWPopulate, user, scroll, onScrollEnd }: IProps) {
  const { courseId, lessonId } = useParams() as { courseId: string, lessonId: string };
  const [state, dispatch] = useReducer(reducer, homeworkWPopulate.homework, initState);
  const errors = errorService.useErrors();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroll && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
        onScrollEnd();
    }
  }, [scroll, onScrollEnd]);

  const onCaptionError = useCallback((imageData: IHomeworkImageData, error: Error) => {
    errorService.addError(String(error));
    dispatch({ type: 'CHANGE_IMAGE', payload: {
      imageDataWState: {
        loadingState: { type: 'error', error: String(error) },
        imageData: imageData,
      },
    }});
  }, []);

  const handleSaveDescriptionAndLink = useCallback(debounce(async (props: {
    id: string
    description: string
    externalHomeworkLink: string
  }) => {
    const { id, ...patch } = props;
    return homeworkService.patchHomework(id, patch)
      .catch(err => errorService.addError(String(err)));
  }, 300), []);

  return (
      <div className={classes._} ref={ref}>
        <div className={classes.nav}>
          <div className={classes.submit}>
            <button
              onClick={() => handleSubmit(state)}
              className={cx({submitBtn: true, isDisabled: isDisabled(state) })+ ' s-text-16-18'}
              disabled={isDisabled(state)}
            >
              {
                state.formState.type === 'pending' ? <Spinner/>
                : state.formState.type === 'success' ? 'Отправлено'
                : t('submitBtn')
              }
            </button>
          </div>
        </div>
        {errors.map(error => (<div className={classes.error} key={error.id}>{error.error}</div>))}
        <div className={classes.inner}>
          <div className={classes.fields}>
            <div className={classes.fieldsTitle + ' s-text-36'}>{t('fieldsTitle')}</div>
            <div className={classes.fieldsInner}>
              <Textarea
                value={state.description}
                onChange={description => {
                  dispatch({ type: 'PATCH_STATE', payload: { description } });
                  handleSaveDescriptionAndLink({ id: state.id, description, externalHomeworkLink: state.externalHomeworkLink });
                }}
              />
              <Input
                  value={state.externalHomeworkLink}
                  onChange={externalHomeworkLink => {
                    dispatch({ type: 'PATCH_STATE', payload: { externalHomeworkLink } });
                    handleSaveDescriptionAndLink({ id: state.id, description: state.description, externalHomeworkLink });
                  }}
              />
            </div>
          </div>
          <div className={classes.files}>
            <div className={classes.filesHeader}>
              <div className={classes.filesTitle + ' s-text-36'}>{t('filesTitle')}</div>
            </div>
            <div className={classes.filesContent}>
              <input onChange={handleAddImages} type='file' multiple hidden id='added-files'/>
              <label className={classes.filesEmpty} htmlFor='added-files'>
                <Upload/>
                <div className='s-text18'>{t('filesEmpty1')}</div>
                <div className='s-text-14'>{t('filesEmpty2')}</div>
              </label>
              {state.images.map(imageDataWState => (
                <div
                  key={imageDataWState.imageData.id}
                  className={classes.file}
                >
                  <File
                    courseId={state.courseId}
                    lessonId={state.lessonId}
                    userId={state.userId}
                    imageDataWState={imageDataWState}
                    onCaptionError={onCaptionError}
                    handleDeleteImage={handleDeleteImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );

  async function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const files = e.target.files;
      if (files) {
        const imageDatas = [...files].map(file => ({ imageData: getImageDataFromFile(file), file }));
        imageDatas.forEach(({ imageData }) => dispatch({ type: 'START_ADD_IMAGE', payload: { imageData }}));
        const images = await Promise.all(imageDatas.map(handleUploadImage));
        const newImages = images.filter(Boolean) as IHomeworkImageData[];
        await homeworkService.getHomework({ courseId, lessonId, userId: user.id })
          .then(hw => homeworkService.patchHomework(state.id, { images: [...newImages, ...hw.images] }))
      }
    } catch (err) {
      const error = err as Error;
      console.error('Failed to add images', { error });
      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'error', error: `Error: Failed to add images. ${error.message}.`}}});
    }
  }

  function getImageDataFromFile(file: File): IHomeworkImageData {
    return {
      id: homeworkService.generateImageId({ originalName: file.name }),
      alt: file.name,
      originalName: file.name,
      src: URL.createObjectURL(file),
      caption: '',
    };
  }

  async function handleUploadImage(props: { file: File, imageData: IHomeworkImageData }) {
    const { file, imageData } = props;
    try {
      if (file.size > MAX_IMAGE_SIZE_B) {
        throw new Error('Image size is bigger than 3Mb');
      }

      await homeworkService.uploadImage({ courseId, lessonId, userId: user.id, imageId: imageData.id, file });

      const imageSrc = await homeworkService.getImageURL({ courseId, lessonId, userId: user.id, imageId: imageData.id });

      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'success' },
          imageData: { ...imageData, src: imageSrc },
        },
      }});

      return { ...imageData, src: imageSrc };
    } catch (err) {
      errorService.addError(String(err));
      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'error', error: String(err), },
          imageData,
        },
      }});
    }
  }

  async function handleDeleteImage(props: { imageId: string }) {
    const { imageId } = props;
    const image = state.images.find(i => i.imageData.id === imageId);
    if (!image) {
      return;
    }

    try {
      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'pending' },
          imageData: image.imageData,
        }
      }});

      const hw = await homeworkService.getHomework({ courseId, lessonId, userId: user.id });
      const imageIndex = hw.images.findIndex(i => i.id === imageId);

      if (imageIndex !== -1) {
        // change images array wo re-asigning array object
        hw.images.splice(imageIndex, 1);
        await homeworkService.patchHomework(state.id, { images: hw.images });
      }

      const imageExists = await homeworkService.getImageURL({ courseId, lessonId, userId: user.id, imageId })
        .then(() => true)
        .catch(() => false);

      if (imageExists) {
        await homeworkService.deleteImage({ courseId, lessonId, userId: user.id, imageId });
      }

      dispatch({ type: 'END_DELETE_IMAGE', payload: props });
    } catch (err) {
      errorService.addError(String(err));
      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'error', error: String(err) },
          imageData: image.imageData,
        }
      }});
    }
  }

  async function handleSubmit(state: TState) {
    if (isDisabled(state)) {
      return;
    }

    try {
      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'pending' }}});
      await homeworkService.patchHomework(state.id, { state: 'SENT_FOR_REVIEW' });
      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'success' }}});
    } catch (err) {
      const error = err as Error;
      console.error('Failed to submit HW', { error });
      errorService.addError(`Error: Failed to submit homework. ${error.message}.`);
    }
  }
}

function initState(homework: IHomeworkData): TState {
  return {
    id: homework.id,
    userId: homework.userId,
    courseId: homework.courseId,
    lessonId: homework.lessonId,
    description: homework.description,
    externalHomeworkLink: homework.externalHomeworkLink,
    images: homework.images.map(imageData => ({ imageData, loadingState: { type: 'idle' } })),
    homeworkState: homework.state,
    formState: { type: 'idle' },
  };
}

function reducer(state: TState, action: TAction): TState {
  switch(action.type) {
    case 'PATCH_STATE': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'START_ADD_IMAGE': {
      const newImageWState: TImageDataWState = {
        imageData: action.payload.imageData,
        loadingState: { type: 'pending' },
      };
      return {
        ...state,
        images: [newImageWState, ...state.images],
      };
    }

    case 'END_DELETE_IMAGE': {
      const imageIndex =  state.images.findIndex(i => i.imageData.id === action.payload.imageId);

      if (imageIndex === -1) {
        return state;
      }

      // change images array wo re-asigning array object
      state.images.splice(imageIndex, 1);
      return {
        ...state,
      };
    }

    case 'CHANGE_IMAGE': {
      const imageIndex = findImageIndexOrFail(state, action.payload.imageDataWState.imageData.id);
      // change images array wo re-asigning array object
      state.images.splice(imageIndex, 1, action.payload.imageDataWState);
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

function findImageIndexOrFail(state: TState, imageId: string) {
  const imageIndex = state.images.findIndex(i => i.imageData.id === imageId);
  if (imageIndex === -1) {
    // TODO add logger
    console.error('Failed to find image in array');
  }

  return imageIndex;
}

function isDisabled(state: TState) {
  const formIsPending = state.formState.type === 'pending';
  const hasNoSource = !state.images.length && !state.externalHomeworkLink;
  const someImagesArePendingOrFailed = state.images.some(({ loadingState }) => ['pending', 'error'].includes(loadingState.type));

  return formIsPending || hasNoSource || someImagesArePendingOrFailed;
}
