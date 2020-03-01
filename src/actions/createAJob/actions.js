import {
  UPDATE_A_JOB_CANDIDATE_PROFILE,
  UPDATE_A_JOB_CREATE_A_DETAILS,
  UPDATE_A_JOB_DOCUMENT,
  UPDATE_A_JOB_JOB_DETAILS,
  UPDATE_A_JOB_JOB_ID,
  UPDATE_A_JOB_MANAGE_RESPONSES,
  UPDATE_A_JOB_MY_ORGANISATION,
  UPDATE_A_JOB_MY_QUESTIONNAIRE,
  UPDATE_A_JOB_POST_JOB,
  UPDATE_I_HIRED_FOR
} from "./constants";

export function updateIHiredFor(jobDetails) {
  return {
    type: UPDATE_I_HIRED_FOR,
    payload: jobDetails
  }
}

export function updateJobDetails(jobDetails) {
  return {
    type: UPDATE_A_JOB_JOB_DETAILS,
    payload: jobDetails
  }
}

export function updateCreateAJob(jobDetails) {
  return {
    type: UPDATE_A_JOB_CREATE_A_DETAILS,
    payload: jobDetails
  }
}

export function updateCandidateProfile(candidateProfile) {
  return {
    type: UPDATE_A_JOB_CANDIDATE_PROFILE,
    payload: candidateProfile
  }
}

export function updateManageResponse(manageResponses) {
  return {
    type: UPDATE_A_JOB_MANAGE_RESPONSES,
    payload: manageResponses
  }
}

export function updateMyOrganisation(myOrganisation) {
  return {
    type: UPDATE_A_JOB_MY_ORGANISATION,
    payload: myOrganisation
  }
}

export function updateMyQuestionnaire(myQuestionnaire) {
  return {
    type: UPDATE_A_JOB_MY_QUESTIONNAIRE,
    payload: myQuestionnaire
  }
}


export function updatePostJob(postJob) {
  return {
    type: UPDATE_A_JOB_POST_JOB,
    payload: postJob
  }
}

export function updateJobId(jobId) {
  return {
    type: UPDATE_A_JOB_JOB_ID,
    payload: jobId
  }
}

export function UpdateDocuments(object) {
  return {
    type: UPDATE_A_JOB_DOCUMENT,
    payload: object
  }
}

