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
                <a className={classes.RowItem}>Курсы</a>
                <a className={classes.RowItem}>Рекомендуемые книги</a>
                <a className={classes.RowItem}>Статьи</a>
                <a className={classes.RowItem}>Отзывы студентов</a>
            </div>
          </div>
          <div className={classes.Social}>
            <div className={classes.Row}>
                <a className={classes.RowItem} href='https://t.me/sofiulyanova' target='_blank'>Telegram</a>
                <a className={classes.RowItem} href='https://www.youtube.com/@sofiulyanova/featured' target='_blank'>YouTube</a>
                <a className={classes.RowItem} href='https://dzen.ru/id/63e1220500d5cb197f2baf8b' target='_blank'>Dzen</a>
                <a className={classes.RowItem} href='https://vk.com/club186282121' target='_blank'>Vkontakte</a>
            </div>
          </div>
          <div className={classes.Right}>
            <div className={classes.Row}>
                <a className={classes.RowItem}>Политика конфидициальности</a>
                <a className={classes.RowItem}>Условия использования</a>
            </div>
          </div>
          <div className={classes.Author}>
            <a className={classes.AuthorTitle}>Made by Sofiia Ulianova</a>
            </div>
        </div>
      </div>
    );
}
