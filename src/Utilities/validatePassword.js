/**
 * To validate the password
 * @param password
 * @returns {boolean}
 */
export default function validatePassword(password) {
  if (password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%\.@#£€*\(\{\\[\]}\^\%\\-\_\+\=)?&]{8,20}$/;
    return re.test(password);
  }
}
