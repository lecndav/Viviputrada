/** @file This code makes a request via xhr using promises
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
/**
 * return a created promise for the async call using es6 fetch()
 * @param method
 * @param url
 * @returns {Promise<any>}
 */

// https://css-tricks.com/using-fetch/

export function fetchRessource(url) {
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    })
        .then(handleResponse)
        .then(data => console.log(url, data))
        .catch(error => console.log(error))
}

function handleResponse (response) {
    let contentType = response.headers.get('content-type')
    if (contentType.includes('application/json')) {
        return handleJSONResponse(response)
    } else if (contentType.includes('text/html')) {
        return handleTextResponse(response)
    } else {
        // Other response types as necessary. I haven't found a need for them yet though.
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