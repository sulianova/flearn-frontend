import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { type IHomeworkData, homeworkService } from 'services/homework.service';
import { type IUserData } from 'services/user.service';
import { formatI18nT } from 'shared';

import Icon from 'ui/Icon/Icon';
import Link from 'ui/Link/Link';
import Spinner from 'ui/Spinner/Spinner';

import InputField from 'ui/Form/Input/InputField';
import classes from './LessonUppload.module.scss';
import { isLink } from 'utils';

export default LessonUppload;

const t = formatI18nT('courseLesson.upload');
const cx = classNames.bind(classes);

interface IProps {
  user: IUserData | null
  homework?: IHomeworkData
}

interface ILinkData {
  link: string
  linkValid: boolean
  state: { type: 'Idle' } | { type: 'Loading' } | { type: 'Success' } | { type: 'Error', error: Error }
}

const initialLinkData: ILinkData = { link: '', linkValid: true,  state: { type: 'Idle' } };

function LessonUppload({ user, homework }: IProps) {
  const { courseId, lessonId } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [linkData, setLinkData] = useState<ILinkData>(() => homework?.externalHomeworkLink ? ({ ...initialLinkData, link: homework?.externalHomeworkLink }) : initialLinkData);

  return (
    <div className={classes.__}>
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
              <InputField
                variant='Link'
                value={linkData.link}
                onChange={v => setLinkData(d => ({ ...d, link: v }))}
                onBlur={() => setLinkData(d => ({ ...d, linkValid: d.link !== '' }))}
                state={linkData.linkValid ? 'idle' : 'error'}
                caption={'Ссылка на задание'}
                className={classes.input}
              />
              <div className={classes.submit}>
                <button
                  disabled={!isLink(linkData.link)}
                  onClick={() => {
                    setIsPending(true);
                    homeworkService.submitHomework({
                      userId: user!.id,
                      courseId: courseId!,
                      lessonId: lessonId!,
                      externalHomeworkLink: linkData.link,
                    })
                    .finally(() => setIsPending(false))
                  }}
                  className={cx({ submitButton: true})}
                >
                  {isPending ? <Spinner/> : t('submitBtn')}
                </button>
              </div>
            </div>
          </>
        )}
        <div className={classes.statusProgress}>
          <div className={cx({ statusProgressStep: true, active: !homework || homework?.state === 'DRAFT' })}>
            <div className={classes.statusProgressStepLine}></div>
            <div className={classes.statusProgressStepContent}>
              <div className={classes.statusProgressStepContentLabel}>
                <span className='isDesktop'>Вы рисуете</span>
                <span className='isMobile'>1</span>
              </div>
            </div>
            <div className={classes.progressStepArrow}>
              <Icon icon='ProgressStepArrow'/>
            </div>
          </div>
          <div className={cx({ statusProgressStep: true, active: homework?.state === 'SENT_FOR_REVIEW' })}>
            <div className={classes.statusProgressStepLine}></div>
            <div className={classes.statusProgressStepContent}>
              <div className={classes.statusProgressStepContentLabel}>
                <span className='isDesktop'>Мы проверяем</span>
                <span className='isMobile'>2</span>
              </div>
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