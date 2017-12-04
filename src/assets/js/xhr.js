/** @file This code makes a request via xhr using promises
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

export function xhrRequest(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}