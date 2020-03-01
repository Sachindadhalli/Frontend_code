/**
 * regex for alphabets and space
 * @return {boolean}
 */
export default function AlphaAndSpace(data) {
  const re = /^[a-zA-Z ]*$/;
  return re.test(data) && data.split(' ').length < 3;
}
