import type { ICourseFeedback } from 'services/course.service';
import { formatI18nT } from 'shared';

import Text from 'ui/Text/Text';

import Icon from 'ui/Icon/Icon';
import classNames from 'classnames/bind';
import classes from './Item.module.scss';

import Img from 'ui/Img/Img';

const cx = classNames.bind(classes);
const t = formatI18nT('socialValidation');

interface IProps {
  feedback: ICourseFeedback
}

export default function Item() {
  return (
    <>
      <div className={classes.column}>
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedback}>
            <p>{t('feedback8.content')}</p>
          </div>
          <div className={classes.user}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/3d_Designer.png",
                  desktop: "/png/3d_Designer.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>{t('feedback8.name')}</div>
              <div className={classes.description}>{t('feedback8.description')}</div>
            </div>
          </div>
        </div>
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedback}>
            <p>{t('feedback10.content')}</p>
          </div>
          <div className={classes.user}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/3d_Illustrator.png",
                  desktop: "/png/3d_Illustrator.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>{t('feedback10.name')}</div>
              <div className={classes.description}>{t('feedback10.description')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedback}>
            <p>{t('feedback1.content')}</p>
          </div>
          <div className={classes.user}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/3d_Hobbi.png",
                  desktop: "/png/3d_Hobbi.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>{t('feedback1.name')}</div>
              <div className={classes.description}>{t('feedback1.description')}</div>
            </div>
          </div>
        </div>
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedback}>
            <p>{t('feedback5.content')}</p>
          </div>
          <div className={classes.user}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/3d_Illustrator.png",
                  desktop: "/png/3d_Illustrator.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>{t('feedback5.name')}</div>
              <div className={classes.description}>{t('feedback5.description')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedback}>
            <p>{t('feedback9.content')}</p>
          </div>
          <div className={classes.user}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/3d_Designer.png",
                  desktop: "/png/3d_Designer.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>{t('feedback9.name')}</div>
              <div className={classes.description}>{t('feedback9.description')}</div>
            </div>
          </div>
        </div>
        <div className={cx({ item: true })}>
          <div className={classes.ratingStars}>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
            <div className={classes.ratingStar}><Icon icon='Star'/></div>
          </div>
          <div className={classes.feedback}>
            <p>{t('feedback7.content')}</p>
          </div>
          <div className={classes.user}>
            <div className={classes.image}>
              <Img
                src={{
                  mobile: "/png/3d_Hobbi.png",
                  desktop: "/png/3d_Hobbi.png",
                }}
                alt=""
              />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>{t('feedback7.name')}</div>
              <div className={classes.description}>{t('feedback7.description')}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
