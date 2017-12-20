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
        xhr.open(method, url, true);
        xhr.setRequestHeader('Accept', 'application/json, text/*');
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}