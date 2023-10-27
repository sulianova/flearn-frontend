import classNames from 'classnames/bind';
import { debounce } from 'lodash';
import { useCallback, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { dataService } from 'services';
import { formatI18nT } from 'shared';

import File from './File/File';
import Input from './Input/Input';
import Textarea from './Textarea/Textarea';
import Spinner from 'ui/Spinner/Spinner';

import Upload from 'assets/images/Svg/Upload';

import classes from './LessonUppload.module.scss';

import { TAction, TImageDataWState, TState } from './types';
import { IHomeworkData, IHomeworkDataWPopulate, IHomeworkImageData, IRootState, IUserData } from 'types';

export default connect(mapStateToProps)(LessonUppload);

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);
const MAX_IMAGE_SIZE_B = 5 * 1_000_000;

interface IConnectedProps {
  user: IUserData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user.user!,
  }
}

interface IProps extends IConnectedProps {
  homeworkWPopulate?: IHomeworkDataWPopulate
  setUploadIsVisible: (value: boolean) => void
}

function LessonUppload({ homeworkWPopulate, setUploadIsVisible, user }: IProps) {
  const { courseId, lessonId } = useParams();
  const [state, dispatch] = useReducer(reducer, { user, courseId: courseId!, lessonId: lessonId! }, initState);

  useEffect(() => {
    let homework = homeworkWPopulate?.homework;
    if (!homework) {
      const newHomework: IHomeworkData = {
        id: state.id,
        userId: state.userId,
        courseId: state.courseId,
        lessonId: state.lessonId,
        description: '',
        externalHomeworkLink: '',
        images: [],
        state: 'DRAFT',
      };
      dataService.homework.set(state.id, newHomework)
        .catch(err => dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'error', error: String(err) }} }));

      return;
    }

    dispatch({
      type: 'PATCH_STATE',
      payload: {
        description: homework.description,
        externalHomeworkLink: homework.externalHomeworkLink,
        images: homework.images.map(imageData => ({ imageData, loadingState: { type: 'idle' } })),
        homeworkState: homework.state,
      },
    });
    // ignore because we need to fill state only on init form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCaptionError = useCallback((imageData: IHomeworkImageData, error: Error) => {
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
    return dataService.homework.patch(id, patch)
      .catch(err => {
        dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'error', error: String(err) } } });
      });
  }, 300), []);

  return (
      <form className={classes._} action='' id='upload-form'>
          <div className={classes.nav}>
            <div className={classes.submit}>
              <button
                onClick={() => handleSubmit(state)}
                className={cx({submitBtn: true, isDisabled: isDisabled(state) })+ ' s-text-16-18'}
                type='submit'
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
      </form>
  );

  async function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const files = e.target.files;
      if (files) {
        const imageDatas = [...files].map(file => ({ imageData: getImageDataFromFile(file), file }));
        imageDatas.forEach(({ imageData }) => dispatch({ type: 'START_ADD_IMAGE', payload: { imageData }}));
        const images = await Promise.all(imageDatas.map(handleUploadImage));
        const newImages = images.filter(Boolean) as IHomeworkImageData[];
        await dataService.homework.get(state.courseId, state.lessonId, state.userId)
          .then(hw => dataService.homework.patch(state.id, { images: [...newImages, ...hw.images] }))
      }
    } catch (err) {
      const error = err as Error;
      console.error('Failed to add images', { error });
      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'error', error: `Error: Failed to add images. ${error.message}.`}}});
    }
  }

  function getImageDataFromFile(file: File): IHomeworkImageData {
    return {
      id: dataService.homework.generateImageId({ originalName: file.name }),
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
        throw new Error('Image size is bigger than 5Mb');
      }

      await dataService.homework.uploadImage({ courseId: state.courseId, lessonId: state.lessonId, userId: state.userId, imageId: imageData.id, file });

      const imageSrc = await dataService.homework.getImageURL({ courseId: state.courseId, lessonId: state.lessonId, userId: state.userId, imageId: imageData.id });

      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'success' },
          imageData: { ...imageData, src: imageSrc },
        },
      }});

      return { ...imageData, src: imageSrc };
    } catch (err) {
      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'error', error: String(err), },
          imageData,
        },
      }});
    }
  }

  async function handleDeleteImage(props: { imageId: string }) {
    const image = state.images.find(i => i.imageData.id === props.imageId);
    if (!image) {
      return;
    }

    dispatch({ type: 'CHANGE_IMAGE', payload: {
      imageDataWState: {
        loadingState: { type: 'pending' },
        imageData: image.imageData,
      }
    }});

    await dataService.homework.get(state.courseId, state.lessonId, state.userId)
      .then(hw => {
        const imageIndex =  hw.images.findIndex(i => i.id === props.imageId);

        if (imageIndex === -1) {
          return;
        }

        // change images array wo re-asigning array object
        hw.images.splice(imageIndex, 1);
        return dataService.homework.patch(state.id, { images: hw.images });
      })
      .then(() => dispatch({ type: 'END_DELETE_IMAGE', payload: props }))
      .catch(err => {
        dispatch({ type: 'CHANGE_IMAGE', payload: {
          imageDataWState: {
            loadingState: { type: 'error', error: String(err) },
            imageData: image.imageData,
          }
        }});
      })
  }

  async function handleSubmit(state: TState) {
    if (isDisabled(state)) {
      return;
    }

    try {
      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'pending' }}});

      await dataService.homework.patch(state.id, { state: 'SENT_FOR_REVIEW' });

      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'success' }}});
      setUploadIsVisible(false);
    } catch (err) {
      const error = err as Error;
      console.error('Failed to submit HW', { error });
      dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'error', error: `Error: Failed to submit homework. ${error.message}.`}}});
    }
  }
}

function initState(props: { user: IUserData, courseId: string, lessonId: string }): TState {
  return {
    id: dataService.homework.getFullId(props.courseId, props.lessonId, props.user.id),
    userId: props.user.id,
    courseId: props.courseId,
    lessonId: props.lessonId,
    description: '',
    externalHomeworkLink: '',
    images: [],
    homeworkState: 'DRAFT',
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
