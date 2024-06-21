import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { type IHomeworkData, homeworkService } from 'services/homework.service';
import { type IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';

import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';
import Spinner from 'ui/Spinner/Spinner';

import Input from './Input/Input';
import classes from './LessonUppload.module.scss';
import { isLink } from 'utils';

export default LessonUppload;

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);

interface IProps {
  user: IUserData | null
  homework?: IHomeworkData
}

function LessonUppload({ user, homework }: IProps) {
  const { courseId, lessonId } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [externalHomeworkLink, setExternalHomeworkLink] = useState(homework?.externalHomeworkLink ?? '');

  useEffect(() => {
    setExternalHomeworkLink(homework?.externalHomeworkLink ?? '');
  }, [homework?.externalHomeworkLink])

  return (
    <div className={classes._}>
      <div className={classes.wrapper}>
        {(homework?.state === 'SENT_FOR_REVIEW' || homework?.state === 'REVIEWED') ? (
          <>
            <div className={classes.title}>Ccылка на ваше задание</div>
            <Link 
              to={homework.externalHomeworkLink}
              target='_blank'
              className={classes.link + ' key-link'}
            >
              {homework.externalHomeworkLink}
            </Link>
          </>
        ) : (
          <>
            <div className={classes.title}>{t('fieldsTitle')}</div>
            <div className={classes.linkForm}>
              <Input
                value={externalHomeworkLink}
                onChange={setExternalHomeworkLink}
              />
              <div className={classes.submit}>
                <button
                  onClick={() => {
                    setIsPending(true);
                    homeworkService.createHomework({
                      userId: user!.id,
                      courseId: courseId!,
                      lessonId: lessonId!,
                      externalHomeworkLink,
                    })
                    .finally(() => setIsPending(false))
                  }}
                  className={cx({ submitBtn: true, isDisabled: !isLink(externalHomeworkLink) })}
                >
                  {isPending ? <Spinner/> : t('submitBtn')}
                </button>
              </div>
            </div>
          </>
        )}
        <div className={classes.statusProgress}>
          <div className={cx({ statusProgressStep: true, active: true })}>
            <div className={classes.statusProgressStepLine}></div>
            <div className={classes.statusProgressStepContent}>
              <div className={classes.statusProgressStepContentLabel}>Отправка задания</div>
            </div>
            <div className={classes.progressStepArrow}>
              <Icon icon='ProgressStepArrow'/>
            </div>
          </div>
          <div className={cx({ statusProgressStep: true, active: homework?.state === 'SENT_FOR_REVIEW' || homework?.state === 'REVIEWED' })}>
            <div className={classes.statusProgressStepLine}></div>
            <div className={classes.statusProgressStepContent}>
              <div className={classes.statusProgressStepContentLabel}>Проверка</div>
            </div>
            <div className={classes.progressStepArrow}>
              <Icon icon='ProgressStepArrow'/>
            </div>
          </div>
          <div className={cx({ finishIconWrapper: true, active: homework?.state === 'REVIEWED' })}>
            <div className={classes.finishIcon}>
              <Icon icon='Finish'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//   async function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
//     try {
//       const files = e.target.files;
//       if (files) {
//         const imageDatas = [...files].map(file => ({ imageData: getImageDataFromFile(file), file }));
//         imageDatas.forEach(({ imageData }) => dispatch({ type: 'START_ADD_IMAGE', payload: { imageData }}));
//         const images = await Promise.all(imageDatas.map(handleUploadImage));
//         const newImages = images.filter(Boolean) as IHomeworkImageData[];
//         await homeworkService.getHomework({ courseId, lessonId, userId: authedUser!.id })
//           .then(hw => homeworkService.patchHomework(state.id, { images: [...newImages, ...hw.images] }))
//       }
//     } catch (err) {
//       const error = err as Error;
//       console.error('Failed to add images', { error });
//       dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'error', error: `Error: Failed to add images. ${error.message}.`}}});
//     }
//   }

//   function getImageDataFromFile(file: File): IHomeworkImageData {
//     return {
//       id: homeworkService.generateImageId({ originalName: file.name }),
//       alt: file.name,
//       originalName: file.name,
//       src: URL.createObjectURL(file),
//       caption: '',
//     };
//   }

//   async function handleUploadImage(props: { file: File, imageData: IHomeworkImageData }) {
//     const { file, imageData } = props;
//     try {
//       if (!isImage(imageData.originalName) && getFileExtension(imageData.originalName) !== 'pdf') {
//         throw new Error('Неверный формат файла.\nДопустимые форматы: jpg, jpeg, png, heic, webp, pdf');
//       }

//       if (file.size > MAX_IMAGE_SIZE_B) {
//         throw new Error('Файл должен быть меньше 3Mb');
//       }

//       await homeworkService.uploadImage({ courseId, lessonId, userId: authedUser!.id, imageId: imageData.id, file });

//       const imageSrc = await homeworkService.getImageURL({ courseId, lessonId, userId: authedUser!.id, imageId: imageData.id });

//       dispatch({ type: 'CHANGE_IMAGE', payload: {
//         imageDataWState: {
//           loadingState: { type: 'success' },
//           imageData: { ...imageData, src: imageSrc },
//         },
//       }});

//       return { ...imageData, src: imageSrc };
//     } catch (err) {
//       errorService.addError(String(err));
//       dispatch({ type: 'CHANGE_IMAGE', payload: {
//         imageDataWState: {
//           loadingState: { type: 'error', error: String(err), },
//           imageData,
//         },
//       }});
//     }
//   }

//   async function handleDeleteImage(props: { imageId: string }) {
//     const { imageId } = props;
//     const image = state.images.find(i => i.imageData.id === imageId);
//     if (!image) {
//       return;
//     }

//     try {
//       dispatch({ type: 'CHANGE_IMAGE', payload: {
//         imageDataWState: {
//           loadingState: { type: 'pending' },
//           imageData: image.imageData,
//         }
//       }});

//       const hw = await homeworkService.getHomework({ courseId, lessonId, userId: authedUser!.id });
//       const imageIndex = hw.images.findIndex(i => i.id === imageId);

//       if (imageIndex !== -1) {
//         // change images array wo re-asigning array object
//         hw.images.splice(imageIndex, 1);
//         await homeworkService.patchHomework(state.id, { images: hw.images });
//       }

//       const imageExists = await homeworkService.getImageURL({ courseId, lessonId, userId: authedUser!.id, imageId })
//         .then(() => true)
//         .catch(() => false);

//       if (imageExists) {
//         await homeworkService.deleteImage({ courseId, lessonId, userId: authedUser!.id, imageId });
//       }

//       dispatch({ type: 'END_DELETE_IMAGE', payload: props });
//     } catch (err) {
//       errorService.addError(String(err));
//       dispatch({ type: 'CHANGE_IMAGE', payload: {
//         imageDataWState: {
//           loadingState: { type: 'error', error: String(err) },
//           imageData: image.imageData,
//         }
//       }});
//     }
//   }

//   async function handleSubmit(state: TState) {
//     if (isDisabled(state)) {
//       return;
//     }

//     try {
//       const lesson = await dataService.lesson.get(state.courseId, state.lessonId);
//       // if (lesson.endDate < new Date()) {
//         throw new Error('Cannot sent homework past deadline');
//       // }
//       dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'pending' }}});
//       await homeworkService.patchHomework(state.id, { state: 'SENT_FOR_REVIEW' });
//       dispatch({ type: 'PATCH_STATE', payload: { formState: { type: 'success' }}});
//     } catch (err) {
//       const error = err as Error;
//       console.error('Failed to submit HW', { error });
//       errorService.addError(`Error: Failed to submit homework. ${error.message}.`);
//     }
//   }
// }

// function initState(homework: IHomeworkData): TState {
//   return {
//     id: homework.id,
//     userId: homework.userId,
//     courseId: homework.courseId,
//     lessonId: homework.lessonId,
//     description: homework.description,
//     externalHomeworkLink: homework.externalHomeworkLink,
//     images: homework.images.map(imageData => ({ imageData, loadingState: { type: 'idle' } })),
//     homeworkState: homework.state,
//     formState: { type: 'idle' },
//   };
// }

// function reducer(state: TState, action: TAction): TState {
//   switch(action.type) {
//     case 'PATCH_STATE': {
//       return {
//         ...state,
//         ...action.payload,
//       };
//     }

//     case 'START_ADD_IMAGE': {
//       const newImageWState: TImageDataWState = {
//         imageData: action.payload.imageData,
//         loadingState: { type: 'pending' },
//       };
//       return {
//         ...state,
//         images: [newImageWState, ...state.images],
//       };
//     }

//     case 'END_DELETE_IMAGE': {
//       const imageIndex =  state.images.findIndex(i => i.imageData.id === action.payload.imageId);

//       if (imageIndex === -1) {
//         return state;
//       }

//       // change images array wo re-asigning array object
//       state.images.splice(imageIndex, 1);
//       return {
//         ...state,
//       };
//     }

//     case 'CHANGE_IMAGE': {
//       const imageIndex = findImageIndexOrFail(state, action.payload.imageDataWState.imageData.id);
//       // change images array wo re-asigning array object
//       state.images.splice(imageIndex, 1, action.payload.imageDataWState);
//       return {
//         ...state,
//       };
//     }

//     default:
//       return state;
//   }
// }

// function findImageIndexOrFail(state: TState, imageId: string) {
//   const imageIndex = state.images.findIndex(i => i.imageData.id === imageId);
//   if (imageIndex === -1) {
//     // TODO add logger
//     console.error('Failed to find image in array');
//   }

//   return imageIndex;
// }

// function isDisabled(state: TState) {
//   const formIsPending = state.formState.type === 'pending';
//   const hasNoSource = !state.description && !state.images.length && !state.externalHomeworkLink;
//   const someImagesArePendingOrFailed = state.images.some(({ loadingState }) => ['pending', 'error'].includes(loadingState.type));

//   return formIsPending || hasNoSource || someImagesArePendingOrFailed;
// }
