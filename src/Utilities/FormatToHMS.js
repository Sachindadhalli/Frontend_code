/**
 * handle date format convertion
 * @return {string}
 */
export default function FormatToHMS(date) {
  let hour = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  return [hour, minutes, seconds].join(':');
}
