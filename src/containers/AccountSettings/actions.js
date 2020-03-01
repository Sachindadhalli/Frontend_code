import accountSettingsConstants from './constants'

function userEmailRequest(reqBody) {
  return {type: accountSettingsConstants.GET_USER_EMAIL_REQUEST, payload: reqBody}
}

function userEmailSuccess(response) {
  return {type: accountSettingsConstants.GET_USER_EMAIL_SUCCESS, payload: response}
}

function userEmailError(error) {
  return {type: accountSettingsConstants.GET_USER_EMAIL_ERROR, error}
}

function deleteAccountRequest(reqBody) {
  return {type: accountSettingsConstants.DELETE_ACCOUNT_REQUEST, payload: reqBody}
}

function deleteAccountSuccess(response) {
  return {type: accountSettingsConstants.DELETE_ACCOUNT_SUCCESS, payload: response}
}

function deleteAccountError(error) {
  return {type: accountSettingsConstants.DELETE_ACCOUNT_ERROR, error}
}

function suspendAccountRequest(reqBody) {
  return {type: accountSettingsConstants.SUSPEND_ACCOUNT_REQUEST, payload: reqBody}
}

function suspendAccountSuccess(response) {
  return {type: accountSettingsConstants.SUSPEND_ACCOUNT_SUCCESS, payload: response}
}

function suspendAccountError(error) {
  return {type: accountSettingsConstants.SUSPEND_ACCOUNT_ERROR, error}
}

function reactivateAccountRequest(reqBody) {
  return {type: accountSettingsConstants.REACTIVATE_ACCOUNT_REQUEST, payload: reqBody}
}

function reactivateAccountSuccess(response) {
  return {type: accountSettingsConstants.REACTIVATE_ACCOUNT_SUCCESS, payload: response}
}

function reactivateAccountError(error) {
  return {type: accountSettingsConstants.REACTIVATE_ACCOUNT_ERROR, error}
}

function changeAccountPasswordRequest(reqBody) {
  return {type: accountSettingsConstants.CHANGE_ACCOUNT_PASSWORD_REQUEST, payload: reqBody}
}

function changeAccountPasswordSuccess(response) {
  return {type: accountSettingsConstants.CHANGE_ACCOUNT_PASSWORD_SUCCESS, payload: response}
}

function changeAccountPasswordError(error) {
  return {type: accountSettingsConstants.CHANGE_ACCOUNT_PASSWORD_ERROR, error}
}

function validateOtpRequest(reqBody) {
  return {type: accountSettingsConstants.VALIDATE_OTP_REQUEST, payload: reqBody}
}

function validateOtpSuccess(response) {
  return {type: accountSettingsConstants.VALIDATE_OTP_SUCCESS, payload: response}
}

function validateOtpError(error) {
  return {type: accountSettingsConstants.VALIDATE_OTP_ERROR, error}
}

function sendOtpRequest(reqBody) {
  return {type: accountSettingsConstants.SEND_OTP_REQUEST, payload: reqBody}
}

function sendOtpSuccess(response) {
  return {type: accountSettingsConstants.SEND_OTP_SUCCESS, payload: response}
}

function sendOtpError(error) {
  return {type: accountSettingsConstants.SEND_OTP_ERROR, error}
}

function checkAvailableEmailRequest(reqBody) {
  return {type: accountSettingsConstants.CHECK_EMAIL_AVAILABLE_REQUEST, payload: reqBody}
}

function checkAvailableEmailSuccess(response) {
  return {type: accountSettingsConstants.CHECK_EMAIL_AVAILABLE_SUCCESS, payload: response}
}

function checkAvailableEmailError(error) {
  return {type: accountSettingsConstants.CHECK_EMAIL_AVAILABLE_ERROR, error}
}

export {
  userEmailRequest,
  userEmailSuccess,
  userEmailError,

  deleteAccountRequest,
  deleteAccountSuccess,
  deleteAccountError,

  suspendAccountRequest,
  suspendAccountSuccess,
  suspendAccountError,

  reactivateAccountRequest,
  reactivateAccountSuccess,
  reactivateAccountError,

  changeAccountPasswordRequest,
  changeAccountPasswordSuccess,
  changeAccountPasswordError,

  validateOtpRequest,
  validateOtpSuccess,
  validateOtpError,

  sendOtpRequest,
  sendOtpSuccess,
  sendOtpError,

  checkAvailableEmailRequest,
  checkAvailableEmailSuccess,
  checkAvailableEmailError
}
