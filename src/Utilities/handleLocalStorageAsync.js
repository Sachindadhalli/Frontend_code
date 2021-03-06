/**
 * handle localstorage set, get and clear asynchronously
 * @param methodName
 * @param key
 * @param value
 */
export default async function handleLocalStorageAsync(methodName, key, value=null) {
    switch(methodName){
        case 'set':
            localStorage.setItem(key, value);
            break;
        case 'get':
            const data = localStorage.getItem(key);
            return data;
        case 'clear':
            localStorage.removeItem(key);
    }
}
