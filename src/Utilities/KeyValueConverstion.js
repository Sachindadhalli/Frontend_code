/**
 * @function, used to convert the object in expected format
 * @param item
 */
const valueToKey = (item) => {
  let modifiedObject = {};
  modifiedObject.key = item.value;
  modifiedObject.value = item.label;
  return modifiedObject;
};
export default valueToKey;
