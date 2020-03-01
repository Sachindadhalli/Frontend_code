/**
 * @function,used to convert into expected format
 * @param item
 */
const keyToValue = (item) => {
  let modifiedObject = {};
  modifiedObject.value = item.key;
  modifiedObject.label = item.value;
  return modifiedObject;
};
export default keyToValue;
