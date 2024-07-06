export enum EAnalyticsEvent {
  Login = 'login', // success
  LoginFailed = 'login_failed',
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
    type: EAnalyticsEvent
    data?: {}
}

export type TAnalyticsEvents =
    | TLogin
    | TLoginFailed;
