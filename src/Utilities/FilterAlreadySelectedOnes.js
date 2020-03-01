/**
 * filter the items other than the selected items
 * @param selectedItems
 * @param sourceItems
 * @param objectName
 * @return {Array}
 * @constructor
 */
const FilterAlreadySelectedOnes = (selectedItems, sourceItems, objectName) => {
  try {
    const selectedItemsKeys = new Set(selectedItems.map(selectedItem => {
      return selectedItem[objectName].key
    }));
    const filteredItems = sourceItems.filter(sourceItem => {
      if (!selectedItemsKeys.has(sourceItem.key)) {
        return sourceItem
      }
    });
    return filteredItems;
  }
  catch (exc) { return [] }
};

export default FilterAlreadySelectedOnes;
