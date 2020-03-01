import browserValidation from "./browserValidation";

/**
 * @file to be validated in other than IE
 * @maxSize should be 2MB
 * @param file
 * @return {number}
 */
function checkFileSizeOther(file) {
  const filesize = file.size;
  return filesize / (1024 * 1024);
}

/**
 * @file to be validated in IE
 * @maxSize should be 2MB
 * @param file
 * @return {number}
 */
function checkFileSizeIE(file) {
  const myFSO = new ActiveXObject('Scripting.FileSystemObject');
  const filepath = file.value;
  const thefile = myFSO.getFile(filepath);
  const size = thefile.size / (1024 * 1024);
  return size
}

/**
 * get extension of the file
 * @param filename
 * @return {*}
 */
function getExt(filename) {
  try {
    return filename.toString().split('.').pop().toLowerCase();
  }
  catch (e) {
    return '';
  }
}

/*
@file = File to be validated
@maxSize = Provide Max Size of file as Number of megabytes
@allowedTypes = Provide array of strings that are allowed 
@return false if validation fails and true if everything is fine
*/
export default function fileValidation(file, maxSize, allowedTypes) {
  let size;
  if (browserValidation() === 'IE')
    size = checkFileSizeIE(file);
  else
    size = checkFileSizeOther(file);

  return size > maxSize ? false : !allowedTypes.includes(getExt(file.name)) ? false : true;
}
