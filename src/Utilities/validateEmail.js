/**
 * To validate the email
 * @param email
 * @returns {boolean}
 */
export default function validateEmail(email) {
  let emailTOCheck = email
  if (email)
    emailTOCheck = email.trim()

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regularPattern = re.test(String(emailTOCheck).toLowerCase())
  if (!regularPattern) {
    return regularPattern
  }
  const seperates = emailTOCheck.split("@");
  const name = seperates[0];
  const domain = seperates[1]
  const lengthValidation = emailTOCheck.length >= 6 && emailTOCheck.length <= 320 && name.length <= 64 && domain.length <= 255
  return (regularPattern && lengthValidation);
}
