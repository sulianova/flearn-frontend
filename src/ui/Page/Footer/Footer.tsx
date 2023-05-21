import Link from 'ui/Link/Link';

import classes from './Footer.module.scss';

export default Footer;

function Footer() {
    return (
        <div className={classes.Footer}>
        <div className={classes.Inner}>
          <div className={classes.Left}>
            <div className={classes.Row}>
              <div className={classes.Logo}>flearn</div>
            </div>
          </div>
          <div className={classes.References}>
            <div className={classes.Row}>
                <Link className={classes.RowItem}>Курсы</Link>
                <Link className={classes.RowItem}>Рекомендуемые книги</Link>
                <Link className={classes.RowItem}>Статьи</Link>
                <Link className={classes.RowItem}>Отзывы студентов</Link>
            </div>
          </div>
          <div className={classes.Social}>
            <div className={classes.Row}>
                <Link to={'https://t.me/sofiulyanova'} className={classes.RowItem} target='_blank'>Telegram</Link>
                <Link to={'https://www.youtube.com/@sofiulyanova/featured'} className={classes.RowItem} target='_blank'>YouTube</Link>
                <Link to={'https://dzen.ru/id/63e1220500d5cb197f2baf8b'} className={classes.RowItem} target='_blank'>Dzen</Link>
                <Link to={'https://vk.com/club186282121'} className={classes.RowItem} target='_blank'>Vkontakte</Link>
            </div>
          </div>
          <div className={classes.Right}>
            <div className={classes.Row}>
                <Link className={classes.RowItem}>Политика конфидициальности</Link>
                <Link className={classes.RowItem}>Условия использования</Link>
            </div>
          </div>
          <div className={classes.Author}>
            <Link className={classes.AuthorTitle}>Made by Sofiia Ulianova</Link>
            </div>
        </div>
      </div>
    );
}
