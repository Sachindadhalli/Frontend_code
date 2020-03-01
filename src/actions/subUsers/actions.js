import {
  UPDATE_EMP_BASIC_DETAILS,
  UPDATE_EMP_CONTACT_DETAILS,
  UPDATE_EMP_WORK_EXP,
  UPDATE_SECTOR_ROLES_HIRE_FOR
} from "./constants";

export function updateEmpBasicDetails(basicDetails) {
  return {
    type: UPDATE_EMP_BASIC_DETAILS,
    payload: basicDetails
  }
}

export function updateEmpContactDetails(contactDetails) {
  return {
    type: UPDATE_EMP_CONTACT_DETAILS,
    payload: contactDetails
  }
}

export function updateEmpWorkExp(workExp) {
  return {
    type: UPDATE_EMP_WORK_EXP,
    payload: workExp
  }
}

export function updateJSectorRolesHireFor(sectorsAndRoles) {
  return {
    type: UPDATE_SECTOR_ROLES_HIRE_FOR,
    payload: sectorsAndRoles
  }
}
