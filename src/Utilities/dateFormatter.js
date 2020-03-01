/**
 * @function to handle expected date format
 * @param date
 * @param format
 * @param delimeter
 * @return {*}
 */
export default function dateFormatter(date, format, delimeter = ' ') {
  if (!date) return '';
  let dateObj = new Date(date);
  let getDateString = dateObj.toDateString().split(' ');

  if (format == 'MY') {
    return monthNames[dateObj.getMonth()] + delimeter + getDateString[3];
  }
  if (format == 'MDY') {
    return monthNames[dateObj.getMonth()] + delimeter + getDateString[2] + ', ' + delimeter + getDateString[3];
  }
  return getDateString.join(' ');

}
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
