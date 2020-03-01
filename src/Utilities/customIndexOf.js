/**
 * differentiating the labels of grouped multi select checkbox dropdown
 * @param arrayData
 * @param matchingData
 * @return {number}
 */
export default function customIndexOf(arrayData, matchingData) {
  if (matchingData.is_parent === 'parent') {
    return -1
  }
  try {
    var item_index = -1;
    for (let i = 0; i < arrayData.length; i++) {
      const singleItem = arrayData[i];
      const isSame = (singleItem.key === matchingData.key && singleItem.parent_key === matchingData.parent_key) || (singleItem.value.includes("Any") && singleItem.parent_key == matchingData.parent_key);
      if (isSame) {
        item_index = i;
        break;
      }
    }
  } catch (exc) {}
  finally {
    return item_index
  }
}
