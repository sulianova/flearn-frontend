import classNames from 'classnames/bind';
import { useReducer, useState } from 'react';
import { useParams } from 'react-router';

import { firebaseService } from 'services';
import { formatI18nT } from 'shared';

import File from './File/File';
import Input from './Input/Input';
import Textarea from './Textarea/Textarea';

import Upload from 'assets/images/Svg/Upload';

import classes from './LessonUppload.module.scss';

import { TAction, TImageDataWState, TState } from './types';
import { IHomeworkImageDataDB, IRootState, IUserData } from 'types';
import { connect } from 'react-redux';

export default connect(mapStateToProps)(LessonUppload);

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);

interface IConnectedProps {
  user: IUserData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    user: state.user.user!
  }
}

function LessonUppload({ user }: IConnectedProps) {
  const { courseId, lessonId } = useParams();
  const [state, dispatch] = useReducer(reducer, { user, courseId: courseId!, lessonId: lessonId! }, initState);

  return (
      <form className={classes._} action='' id='upload-form'>
          <div className={classes.nav}>
            <div className={classes.submit}>
              <button className={cx({submitBtn: true, isDisabled: false})+ ' s-text-16-18'} type='submit' disabled>{t('submitBtn')}</button>
              {/* <div className={classes.submitDescription + ' s-text-14'}>{t('submitDescription')} </div> */}
            </div>
          </div>
        <div className={classes.inner}>
          <div className={classes.fields}>
            <div className={classes.fieldsTitle + ' s-text-36'}>{t('fieldsTitle')}</div>
            <div className={classes.fieldsInner}>
              <Textarea/>
              <Input/>
            </div>
            {/* <div className={classes.submit}>
                <button className={cx({submitBtn: true, isDisabled: true})+ ' s-text-18'} type='submit' disabled>{t('submitBtn')}</button>
                <div className={classes.submitDescription + ' s-text-14'}>{t('submitDescription')} </div>
            </div> */}
          </div>
          <div className={classes.files}>
            <div className={classes.filesHeader}>
              <div className={classes.filesTitle + ' s-text-36'}>{t('filesTitle')}</div>
              {/* <input onChange={handleAddImages} type='file' multiple hidden id='added-files'/>
              <label className={classes.filesBtn} htmlFor='added-files'>{t('filesBtn')}</label> */}
            </div>
            <div className={classes.filesContent}>
              <input onChange={handleAddImages} type='file' multiple hidden id='added-files'/>
              <label className={classes.filesEmpty} htmlFor='added-files'>
                <Upload/>
                <div className='s-text18'>{t('filesEmpty1')}</div>
                <div className='s-text-14'>{t('filesEmpty2')}</div>
              </label>
              <div
                className={classes.file}
              >
                <File imageDataWState={{ imageData: { id: '', originalName: 'pic.png', alt: '' }, loadingState: { type: 'pending' }}}/>
              </div>
                {/* <div
                  className={classes.file}
                >
                  <File imageDataWState={{ imageData: { id: '', originalName: 'pic.png', alt: '' }, loadingState: { type: 'pending' }}}/>
                </div>
                <div
                className={classes.file}
              >
                <File imageDataWState={{ imageData: { id: '', originalName: 'pic.png', alt: '' }, loadingState: { type: 'pending' }}}/>
              </div>
                <div
                  className={classes.file}
                >
                  <File imageDataWState={{ imageData: { id: '', originalName: 'pic.png', alt: '' }, loadingState: { type: 'pending' }}}/>
                </div> */}
              {state.images.map(imageDataWState => (
                <div
                  key={imageDataWState.imageData.id}
                  className={classes.file}
                >
                  <File imageDataWState={imageDataWState}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
  );

  async function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    console.log({ files });
    if (files) {
      console.log('start add files');
      await Promise.all([...files].map(handleAddImage));
      console.log('end add files');
    }
  }

  async function handleAddImage(file: File) {
    const imageId = file.name;
    if (state.images.findIndex(i => i.imageData.id === imageId) !== -1) {
      return;
    }

    const newImageDataDB: IHomeworkImageDataDB = {
      id: imageId,
      alt: file.name,
      originalName: file.name,
    };

    dispatch({ type: 'START_ADD_IMAGE', payload: { imageData: newImageDataDB }});

    try {
      await firebaseService.uploadImage({ courseId: courseId!, folder: state.lessonId, imageId, variant: 'homeworks', file });
      const imageSrc = await firebaseService.getImageURL({ courseId: courseId!, folder: state.lessonId, imageId, variant: 'homeworks' });

      if (!imageSrc) {
        throw new Error('Failed to fetch image src');
      }

      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'success' },
          imageData: { ...newImageDataDB, src: imageSrc },
        },
      }});
    } catch (err) {
      dispatch({ type: 'CHANGE_IMAGE', payload: {
        imageDataWState: {
          loadingState: { type: 'error', error: String(err), },
          imageData: newImageDataDB,
        },
      }});
    }
  }
}

function initState(props: { user: IUserData, courseId: string, lessonId: string }): TState {
  return {
    userId: props.user.id,
    courseId: props.courseId,
    lessonId: props.lessonId,
    description: '',
    externalHomeworkLink: '',
    images: [],
  };
}

function reducer(state: TState, action: TAction): TState {
  switch(action.type) {
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
      const imageIndex = findImageIndexOrFail(state, action.payload.imageId);

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
