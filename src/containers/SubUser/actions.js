import subUserConstants from './constants'

function getSubuserListRequest(reqBody) {
  return {type: subUserConstants.GET_SUBUSERS_REQUEST, payload: reqBody}
}

function getSubuserListSuccess(response) {
  return {type: subUserConstants.GET_SUBUSERS_SUCCESS, payload: response}
}

function getSubuserListError(error) {
  return {type: subUserConstants.GET_SUBUSERS_ERROR, error}
}

function deleteSubuserRequest(reqBody) {
  return {type: subUserConstants.DELETE_SUBUSERS_REQUEST, payload: reqBody}
}

function deleteSubuserSuccess(response) {
  return {type: subUserConstants.DELETE_SUBUSERS_SUCCESS, payload: response}
}

function deleteSubuserError(error) {
  return {type: subUserConstants.DELETE_SUBUSERS_ERROR, error}
}

function subuserDataRequest(reqBody) {
  return {type: subUserConstants.GET_SUBUSER_DATA_REQUEST, payload: reqBody}
}

function subuserDataSuccess(response) {
  return {type: subUserConstants.GET_SUBUSER_DATA_SUCCESS, payload: response}
}

function subuserDataError(error) {
  return {type: subUserConstants.GET_SUBUSER_DATA_ERROR, error}
}

function userPermissionRequest(reqBody) {
  return {type: subUserConstants.GET_USER_PERMISSIONS_REQUEST, payload: reqBody}
}

function userPermissionSuccess(response) {
  return {type: subUserConstants.GET_USER_PERMISSIONS_SUCCESS, payload: response}
}

function userPermissionError(error) {
  return {type: subUserConstants.GET_USER_PERMISSIONS_ERROR, error}
}

function updateSubuserDataRequest(reqBody) {
  return {type: subUserConstants.UPDATE_SUBUSER_DATA_REQUEST, payload: reqBody}
}

function updateSubuserDataSuccess(response) {
  return {type: subUserConstants.UPDATE_SUBUSER_DATA_SUCCESS, payload: response}
}

function updateSubuserDataError(error) {
  return {type: subUserConstants.UPDATE_SUBUSER_DATA_ERROR, error}
}

export {
  getSubuserListRequest,
  getSubuserListSuccess,
  getSubuserListError,

  deleteSubuserRequest,
  deleteSubuserSuccess,
  deleteSubuserError,

  subuserDataRequest,
  subuserDataSuccess,
  subuserDataError,

  userPermissionRequest,
  userPermissionSuccess,
  userPermissionError,

  updateSubuserDataRequest,
  updateSubuserDataSuccess,
  updateSubuserDataError
}

