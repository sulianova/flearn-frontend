import classes from './DecisionForm.module.scss';
import classesInput from './InputField.module.scss';
import classNames from 'classnames/bind'

export default DecisionForm;

const cx = classNames.bind(classes);
const cx2 = classNames.bind(classesInput);

function DecisionForm() {
  return (
    <div className={classes.wrapper} id="decision-form">
      <div className={cx({ block: true, blockDetails: true })}>
        <h1 className={classes.title + ' s-text-56'}>Записаться на онлайн курс</h1>
        <div className={classes.credit}>
          <s className={classes.creditWas + ' s-text-24'}>14 000 &#8381;</s>
          <div className={classes.creditPrice + ' s-text-88'}>7 000 &#8381;<span className={classes.discount + ' s-text-18'}>-30%</span></div>
        </div>
        <div className={classes.courseName + ' s-text-18'}>Короткий курс для начинающих: “Как рисовать свободно”</div>
      </div>
      <div className={classes.block}>
        <h1 className={classes.subtitle + ' s-text-24'}>Заполните форму и я свяжусь с вами, чтобы оформить оплату</h1>
        <form className={classes.form} data-hs-cf-bound="true">
          <div className={classes.inputWrap}>
            <input className={cx2({ input: true, dark: true }) + ' s-text-24'} id="name2" name="name2" placeholder="Имя" required type="text"/>
          </div>
          <div className={classes.inputWrap}>
            <label htmlFor="phone2"></label>
            <input className={cx2({ input: true, dark: true }) + ' s-text-24'} id="phone2" name="name2" placeholder="+78888888888" required type="tel"/>
          </div>
          <div className={classes.inputWrap}>
            <input className={cx2({ input: true, dark: true }) + ' s-text-24'} id="email2" name="email2" placeholder="Email" required type="email"/>
          </div>
          <div className={classes.agreement}>
            <input className={classes.agreementCheckbox} type="checkbox" id="agreement-consult" defaultChecked/>
            <label htmlFor="agreement-consult">
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="checkmark" clip-path="url(#clip0_1024_2304)">
                  <path d="M2 2.5L8.5 15.5L15 2.5" stroke="#707070" stroke-width="2" stroke-linecap="round"></path>
                </g>
                <rect x="1" y="1.5" width="15" height="15" stroke="#707070" stroke-width="2"></rect>
                <defs>
                  <clipPath id="clip0_1024_2304">
                    <rect y="0.5" width="17" height="17" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg><span className={classes.agreementText + " s-text-18"}>
                Я соглашаюсь&nbsp; 
                <a href="">c правилами использования</a></span>
            </label>
          </div>
          <button className={classes.submitButton + ' s-text-24'} type="button"><span>Записаться</span></button>
        </form>

      </div>
    </div>
  );
}