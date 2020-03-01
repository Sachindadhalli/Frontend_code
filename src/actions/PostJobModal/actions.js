import {SET_POST_JOB_MODAL} from './constants'

export function setPostJobModal(jobDetails) {
  return {
    type: SET_POST_JOB_MODAL,
    payload: jobDetails
  }
}
