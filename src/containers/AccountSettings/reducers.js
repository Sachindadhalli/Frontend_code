import accountSettingsConstants from './constants';

const initialState = {loading: false, response: null, error: null}

export function userEmailReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.GET_USER_EMAIL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.GET_USER_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.GET_USER_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function deleteAccountReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function suspendAccountReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.SUSPEND_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.SUSPEND_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.SUSPEND_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function reactivateAccountReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.REACTIVATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.REACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.REACTIVATE_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function changeAccountPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.CHANGE_ACCOUNT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.CHANGE_ACCOUNT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.CHANGE_ACCOUNT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function validateOtpReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.VALIDATE_OTP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.VALIDATE_OTP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function sendOtpReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.SEND_OTP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.SEND_OTP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function checkAvailableEmailReducer(state = initialState, action) {
  switch (action.type) {
    case accountSettingsConstants.CHECK_EMAIL_AVAILABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case accountSettingsConstants.CHECK_EMAIL_AVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case accountSettingsConstants.CHECK_EMAIL_AVAILABLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
