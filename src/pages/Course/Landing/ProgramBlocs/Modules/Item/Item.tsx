import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';

import type { ICourseData } from 'services/course.service';
import { formatI18nT } from 'shared';

import Animated from 'ui/Animated';
import Image from 'ui/Img/Img';
import Text from 'ui/Text/Text';
import Plus from 'assets/images/Svg/Plus';
import SubsectionArrow from 'assets/images/Svg/SubsectionArrow';

import classes from './Item.module.scss';
import { useIsMobile } from 'hooks';
import Subsection from './Subsection/Subsection';

export default Item;

const t = formatI18nT('courseLanding.modules');
const cx = classNames.bind(classes);

function Item(props: NonNullable<ICourseData['modules']>[number]) {
  const isMobile = useIsMobile();
  const [opened, setOpened] = useState(false);

  // const withImage = props.imageId !== undefined;
  // if (withImage) {
  //   return (
  //     <div className={classes.listItem}>
  //       <Animated.Scroll>
  //         {(id, className) => (
  //           <div className={cx({ listItemCard: true }, className)} id={id}>
  //             <div className={classes.listItemMeta + ' s-text-16'}><Text text={props.meta}/></div>
  //             <div className={classes.listItemTitle + ' s-text-36'}><Text text={props.title}/></div>
  //             <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>
  //               <div className={classes.listItemLabel}>
  //                 <span className={classes.listItemLabelIcon}>
  //                   <Plus/>
  //                 </span>
  //                 <span className={classes.listItemLabelText + ' s-text-21'}><Text text={props.imageDesc!}/></span>
  //               </div>
  //           </div>
  //         )}
  //       </Animated.Scroll>
  //       <Animated.Scroll>
  //         {(id, className) => (
  //           <div className={cx({ listItemCard: true, listItemCardMedia: true }, className)} id={id}>
  //             <div className={classes.listItemMedia}><Image src={props.imageSrc!} alt={props.imageAlt!}/></div>
  //           </div>
  //         )}
  //       </Animated.Scroll>
  //     </div>
  //   );
  // }

  const tagsListNode = (
    <ul className={classes.tags}>
      <li className={classes.tag  + ' s-text-16'}>Линия</li>
      <li className={classes.tag  + ' s-text-16'}>Быстрые наброски</li>
      <li className={classes.tag  + ' s-text-16'}>Контраст</li>
      <li className={classes.tag  + ' s-text-16'}>Выделение главного</li>
    </ul>
  );

  return (
    <div className={classes.item} style={{ '--items-in-row': 1 } as React.CSSProperties}>
      <Animated.Scroll>
        {(id, className) => (
          <div className={cx({ itemCard: true }, className)} id={id}>
            <div className={classes.bullet}>2</div>
            <div className={classes.meta + ' s-text-16'}><Text text={props.meta}/></div>
            <div className={classes.title + ' s-text-36'}>
              <Text text={props.title}/>
              <button
                className={classes.hiddenButton}
                type="button"
                onClick={() => setOpened(o => !o)}
              />
            {!isMobile && tagsListNode}
            </div>
            {/* <div className={classes.description + ' s-text-21'}>Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается.</div> */}
            <div className={cx({ slideDown: true, slideDownClosed: !opened })}>
              {isMobile && tagsListNode}
              <div className={classes.additionalInfo}>
                <div className={classes.subsections}>
                  <Subsection/>
                  <Subsection/>
                </div>
                <div className={classes.projects}>
                  <div className={classes.projectsDescription + ' s-text-28'}>Сделаете 5-6 стикеров для Telegram.</div>
                </div>
              </div>
            </div>
            {/* {props.content && Boolean(!Array.isArray(props.content) || props.content.length) && <div className={classes.listItemContent + ' s-text-21'}><Text text={props.content}/></div>} */}
          </div>
        )}
      </Animated.Scroll>
    </div>
  );
}
