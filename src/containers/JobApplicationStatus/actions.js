import jobApplicationStatusConstants from './constants'

function jobApplicationListRequest(reqBody) { return { type: jobApplicationStatusConstants.GET_JOB_APPLICATION_LIST_REQUEST, payload:reqBody } }
function jobApplicationListSuccess(response) { return { type: jobApplicationStatusConstants.GET_JOB_APPLICATION_LIST_SUCCESS, payload:response } }
function jobApplicationListError(error) { return { type: jobApplicationStatusConstants.GET_JOB_APPLICATION_LIST_ERROR, error } }

function jobApplicationDataRequest(reqBody) { return { type: jobApplicationStatusConstants.GET_JOB_APPLICATION_DATA_REQUEST, payload:reqBody } }
function jobApplicationDataSuccess(response) { return { type: jobApplicationStatusConstants.GET_JOB_APPLICATION_DATA_SUCCESS, payload:response } }
function jobApplicationDataError(error) { return { type: jobApplicationStatusConstants.GET_JOB_APPLICATION_DATA_ERROR, error } }

export {
  jobApplicationListRequest,
  jobApplicationListSuccess,
  jobApplicationListError,

  jobApplicationDataRequest,
  jobApplicationDataSuccess,
  jobApplicationDataError,
}

