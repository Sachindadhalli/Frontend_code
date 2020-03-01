const isObjectAlreadyExist = (singleValue, valueArray) => {
  let isContains = false;
  try {
    valueArray.map((value) => {
      if (value.value === singleValue.value) {
        isContains = true
      }
    })
  } catch (exc) {
  }
  return isContains;
};

export default isObjectAlreadyExist;
