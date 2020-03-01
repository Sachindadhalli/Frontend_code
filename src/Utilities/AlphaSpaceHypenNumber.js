/**
 * regex for aphabets, hypen, number and space
 * @return {boolean}
 */
export default function AlphaSpaceHypenNumber(data) {
  const re = /^[0-9A-Za-z\s\-]+$/
  return re.test(data);
}
