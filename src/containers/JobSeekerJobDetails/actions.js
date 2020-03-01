//utilities
import {jobListingConstants} from './constants'

function jobListRequest(reqBody) {
  return {type: jobListingConstants.GET_JOBS_LIST_REQUEST, payload: reqBody}
}

function jobListSuccess(response) {
  return {type: jobListingConstants.GET_JOBS_LIST_SUCCESS, payload: response}
}

function jobListError(error) {
  return {type: jobListingConstants.GET_JOBS_LIST_ERROR, error}
}

function ShareJobsRequest(reqBody) {
  return {type: jobListingConstants.SHARE_JOBS_REQUEST, payload: reqBody}
}

function ShareJobsSuccess(response) {
  return {type: jobListingConstants.SHARE_JOBS_SUCCESS, payload: response}
}

function ShareJobsError(error) {
  return {type: jobListingConstants.SHARE_JOBS_ERROR, error}
}

function savedJobsRequest(reqBody) {
  return {type: jobListingConstants.SAVED_JOBS_REQUEST, payload: reqBody}
}

function savedJobsSuccess(response) {
  return {type: jobListingConstants.SAVED_JOBS_SUCCESS, payload: response}
}

function savedJobsError(error) {
  return {type: jobListingConstants.SAVED_JOBS_ERROR, error}
}

export {
  jobListRequest,
  jobListSuccess,
  jobListError,

  ShareJobsRequest,
  ShareJobsSuccess,
  ShareJobsError,

  savedJobsRequest,
  savedJobsSuccess,
  savedJobsError,
}
