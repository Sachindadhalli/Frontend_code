import employerLoginConstants from './constants';

function employerLoginRequest(reqBody) {
  return {type: employerLoginConstants.EMPLOYER_LOGIN_REQUEST, payload: reqBody}
}

function employerLoginSuccess(response) {
  return {type: employerLoginConstants.EMPLOYER_LOGIN_SUCCESS, payload: response}
}

function employerLoginError(error) {
  return {type: employerLoginConstants.EMPLOYER_LOGIN_ERROR, error}
}

export {
  employerLoginRequest,
  employerLoginSuccess,
  employerLoginError
}
