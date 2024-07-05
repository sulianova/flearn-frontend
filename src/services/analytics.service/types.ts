export enum EAnalyticsEvent {
    TryToLogin = 'try_to_login',
    Login = 'login',
    SignUp = 'sign_up',
    PageVisited = 'page_visited',
    ButtonClicked = 'button_clicked',
    StartTypingInDecisionForm = 'start_typing_in_decision_form',
    TriedToSubmitDecisionForm = 'tried_to_submit_decision_form',
    DecisionFormSubmitedSuccessfully = 'decision_form_submited_successfully',
    DecisionFormSubmitedWithError = 'decision_form_submited_with_error',
}

export type TLandingPageVisitedEvent = {
    type: EAnalyticsEvent.PageVisited
    data: {
        type: 'landing_page'
        courseId: string
    };
}

export type TScrollToDecisionFormButtonClicked = {
    type: EAnalyticsEvent.ButtonClicked
    data: {
        type: 'scroll_to_decision_form_button_clicked'
    };
}

export type TElse = {
    type: EAnalyticsEvent
    data?: {}
}

export type TAnalyticsEvents =
    | TLandingPageVisitedEvent
    | TScrollToDecisionFormButtonClicked
    | TElse;
