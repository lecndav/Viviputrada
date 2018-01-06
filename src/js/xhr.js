/** @file This code makes a request via xhr using promises
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import { updatePopup } from './drawMap.js';

/**
 * return a created promise for the async call using es6 fetch()
 * @param url, stopName
 * @returns {Promise<any>}
 */

// https://css-tricks.com/using-fetch/

export function fetchRessource(url, stopName) {
    fetch(url, {method: 'GET'})
        .then(handleResponse)
        // .then(data => console.log(url, data))
        .then(data => updatePopup(data, stopName))
        .catch(error => console.log(error))
}

function handleResponse (response) {
    let contentType = response.headers.get('content-type')
    if (contentType.includes('application/json')) {
        return handleJSONResponse(response)
    } else if (contentType.includes('text/html')) {
        return handleTextResponse(response)
    } else {
        // Other response types
        throw new Error(`Sorry, content-type ${contentType} not supported`)
    }
}

function handleJSONResponse (response) {
    return response.json()
        .then(json => {
            if (response.ok) {
                return json
            } else {
                return Promise.reject(Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText
                }))
            }
        })
}

function handleTextResponse (response) {
    return response.text()
        .then(text => {
            if (response.ok) {
                return text
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    err: text
                })
            }
        })
}