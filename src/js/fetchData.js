/** @file This is the file that gets data gtfs and realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from "./_config.js";
import { data } from './index.js'
import { xhrRequest } from './xhr.js';
import gtfs2geojson from 'gtfs2geojson'
//import csv from 'csvtojson'

let  wlXhrResponse, activeTrafficInfo = 'stoerunglang';

/**
 * read GTFS data (stops, shapes), convert to geoJSON by calling gtfs2geojson node and store it in the data object
 */
export function gtfsData(url, property){
    xhrRequest('GET', url)
        .then(function (e) {
            //
            // delete ' " ' from gtfs file, because they shouldn't be there according to Google's standard https://developers.google.com/transit/gtfs/examples/gtfs-feed
            switch(property) {
                case 'stops': data.setFetchedData('gtfs', 'stops', gtfs2geojson.stops(e.target.response.toString().replace('"',''))); break;
                case 'shapes':data.setFetchedData('gtfs', 'shapes', gtfs2geojson.lines(e.target.response.toString().replace('"',''))); break;
            }
        }, function (e) {
            console.log(`error loading ${url}`); // handle errors
        });
}

/**
 * get JSON Data
 */
export function fetchData() {
    config.JSON_URLS.forEach(currentValue => {
        xhrRequest('GET', currentValue)
            .then(function (e) {
                // TODO: movce to own helper function
                data.setFetchedData('json',[extraxtNameFromFilename(currentValue)],JSON.parse(e.target.response))
            }, function (e) {
                console.log(`error lading ${currentValue}`); // handle errors
            });
    })

    /**
     * API CALL
     */
    xhrRequest('GET', buildApiUrl([135, 136])) //TODO: TEST
        .then(function (e) {
            wlXhrResponse = JSON.parse(e.target.response);
            console.log(wlXhrResponse)
        }, function (e) {
            console.log('error loading api ressource'); // handle errors
        });
}

/**
 * TODO: move to helper functions
 * @param s
 * @returns {string}
 */
export function extractLineFromGTFS (s) {
    return (/[^-]*-([^-]+)-.*/ig).exec(s)[1];
}

/**
 *
 * @param s
 * @returns {string}
 */
export function extraxtNameFromFilename (s) {
    return (/[^-]*-[^-]*-([^-]+)\..*/ig).exec(s)[1];
}

/**
 *
 * @param rbl
 * @returns {string}
 */
export function buildApiUrl(rbl) {
    let rblList = ''
    rbl.forEach(currentValue => {
        rblList += `&rbl=${currentValue}`
    })
    return `${config.CORS_DOMAIN}${config.WL_API_BASE_URL}/monitor?&activeTrafficInfo=${activeTrafficInfo}&sender=${config.WL_API_KEY_DEV}${rblList}`
}
