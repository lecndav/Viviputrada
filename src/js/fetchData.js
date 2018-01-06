/** @file This is the file that gets realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from "./_config.js";
import { fetchRessource } from './xhr.js';

/**
 * BUILD URL, CALL FETCH
 * @param rblNumber
 * @param stopName
 * @returns {Promise<any>}
 */
export function fetchData(rblNumber, stopName) {
    return fetchRessource(buildApiUrl(rblNumber), stopName)
}

/**
 * BUILD URL FOR API
 * helper function for fetch data
 * @param rbl
 * @returns {string}
 */
export function buildApiUrl(rbl) {
    let rblList = ''
    rbl.forEach(currentValue => {
        rblList += `&rbl=${currentValue}`
    })
    return `${config.CORS_DOMAIN}${config.WL_API_BASE_URL}/monitor?&activeTrafficInfo=${config.WL_ACTIVE_TRAFFIC_INFO}&sender=${config.WL_API_KEY_DEV}${rblList}`
}