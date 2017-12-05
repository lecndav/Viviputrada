/** @file This code makes a request via xhr using promises
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

/**
 * return a created promise for the async call
 * @param method
 * @param url
 * @returns {Promise<any>}
 */
export function xhrRequest(method, url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
//      xhr.setRequestHeader('Content-Type', 'application/json; charset=\'utf-8\'');
      //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf8')
        /*xhr.onload = (event) => {
            resolve(event.target.response)
        }*/
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}