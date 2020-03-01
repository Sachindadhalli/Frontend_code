export default function calculateTotalCount(containerArr) {
  let total = 0;
  try {
    containerArr.map((singleElement) => {
      total += (singleElement.value).length;
    })
  } catch (exc) {}
  return total;
}
