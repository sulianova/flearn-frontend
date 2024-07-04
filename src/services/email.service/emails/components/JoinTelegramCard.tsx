import Button from './Button';
import Card from './Card';

export default function JoinTelegramCard() {
  return (
    <Card
      content={[
        {
          paddingTop: 5,
          paddingBottom: 20,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 32, lineHeight: '38px', color: '#000000' }}>
                <span>
                  Присоединяйтесь к нам в Telegram
                </span>
              </td>
            </tr>
          ),
        },
        {
          paddingBottom: 40,
          value: (
            <tr>
              <td valign="top" align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 16, lineHeight: '20px', color: '#000000' }}>
                <span>
                  Там мы рассказываем про анонсы и скидки на ранние запуски курсов в flearn.
                  А также наш преподаватель, Соня Ульянова пишет про свои личные проекты и
                  отвечает на вопросы студентов.
                </span>
              </td>
            </tr>
          ),
        },
        {
          paddingBottom: 5,
          value: (
            <tr>
              <td align="left">
                <Button href='https://t.me/sofiulyanova'>
                  Присоединиться к телеграм-каналу
                </Button>
              </td>
            </tr>
          ),
        },
      ]}
    />
  );
}
