/**
 * To validate the name and length of name
 * @param name
 * @param maxLen
 * @returns {boolean}
 */
export default function validateName(name, maxLen) {
  if (!name)
    return false;
  let max = 30;
  if (maxLen) {
    max = maxLen;
  }
  const nameLength = name.length;
  const format = /[!@#$%^&*()_+\-=\[\]{};:"\\|,<>\/?]/;
  const isValidSpaceCount = (name.split(" ").length) <= 2;
  const isValidsDotCount = (name.split(".").length) <= 2;
  const isValidApostropheCount = (name.split("'").length) <= 2;
  const numericMatching = name.match(/\d+/g) == null;
  const isValid = nameLength >= 2 && nameLength <= max && !(format.test(name)) && isValidApostropheCount && isValidSpaceCount && isValidsDotCount && numericMatching;
  return isValid
}
