
// view page on UTM
// form? => generate_lead
// button_clicked_start_study
// login
// page_view_lms
// open buy form
// mark as paid

export enum EAnalyticsEvent {
  ButtonClicked = 'button_clicked',
  GenerateLead = 'generate_lead', // submit signUp to course form
  ButtonClickedStartStudy = 'button_clicked_start_study',
  Login = 'login', // success
  LoginFailed = 'login_failed',
  // page_view_lms: custom event from page_view,
  FormStartBuyCourse = 'form_start_buy_course',
  Purchase = 'purchase',
}

export type TLogin = {
  type: EAnalyticsEvent.Login
  data: {
    method: 'Google'
  }
};

export type TLoginFailed = {
  type: EAnalyticsEvent.LoginFailed
  data: {
    method: 'Google'
    reason: string
  }
};

export type TElse = {
    type:
      | EAnalyticsEvent.ButtonClicked
      | EAnalyticsEvent.GenerateLead
      | EAnalyticsEvent.ButtonClickedStartStudy
      | EAnalyticsEvent.FormStartBuyCourse
      | EAnalyticsEvent.Purchase;
    data?: {}
}

export type TAnalyticsEvents =
    | TLogin
    | TLoginFailed
    | TElse;
