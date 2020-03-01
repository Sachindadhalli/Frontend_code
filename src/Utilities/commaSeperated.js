/**
 * convert array to comma separated string
 * @param arrayData
 * @return {string}
 */
export default function commaSeperated(arrayData) {
  let data = "";
  arrayData.forEach((singleItem, index) => {
    if (index === 0) {
      data += singleItem.value
    }
    else {
      data += "," + singleItem.value
    }
  });
  return data.replace("Any,", "")
}
