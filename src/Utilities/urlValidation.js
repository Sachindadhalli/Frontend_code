/**
 * To validate the url Format
 * @param userInput
 * @param target_site
 * @returns {boolean}
 */
export default function urlValidation(userInput, target_site = '') {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res == null || userInput.includes(target_site) === false)
    return false;
  else
    return true;
}
