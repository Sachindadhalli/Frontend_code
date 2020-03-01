/**
 * To validate the designation,type of designation
 * @param designation
 * @param type
 * @returns {boolean}
 */
export default function validateDesignation(designation, type) {
  if (designation) {
    let format = '';
    if (type == 'current_employer') {
      format = /^[a-zA-Z0-9][a-zA-Z.0-9\s]*$/;
      return true
    } else {
      format = /^[a-zA-Z][a-zA-Z.\s]*$/;
    }
    const firstNumericMatching = type == 'current_employer' ? true : designation[0].match(/\d+/g) == null;
    const isValid = format.test(designation[0]) && firstNumericMatching;
    return isValid
  }
  return false;
}
