import {loginConstants} from './constants';

function loginRequest(reqBody) {
  return {type: loginConstants.LOGIN_REQUEST, payload: reqBody}
}

function loginSuccess(response) {
  return {type: loginConstants.LOGIN_SUCCESS, payload: response}
}

function loginFailure(error) {
  return {type: loginConstants.LOGIN_FAILURE, error}
}

export {
  loginRequest,
  loginSuccess,
  loginFailure
}
