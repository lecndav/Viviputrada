/** @file This is the file that gets realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from "./_config.js";
import { fetchRessource } from './xhr.js';
import steige from '../assets/json/wienerlinien-ogd-steige.json'
//import { data } from './index.js'
//import gtfs2geojson from 'gtfs2geojson'
//import csv from 'csvtojson'

let  wlXhrResponse, activeTrafficInfo = 'stoerunglang', rblNumbers = new Set();
/*
export function getAllRblNumbers(){
    const temp = steige.filter(
        function(steige){
            if(steige.RBL_NUMMER) {
                rblNumbers.add(steige.RBL_NUMMER)
            }
        }
    )

    console.log(buildApiUrl(rblNumbers))
}*/

export function buildApiUrl(rbl) {
    let rblList = ''
    rbl.forEach(currentValue => {
        rblList += `&rbl=${currentValue}`
    })
    return `${config.CORS_DOMAIN}${config.WL_API_BASE_URL}/monitor?&activeTrafficInfo=${activeTrafficInfo}&sender=${config.WL_API_KEY_DEV}${rblList}`
}

/**
 * read GTFS data (stops, shapes), convert to geoJSON by calling gtfs2geojson node and store it in the data object
 */
/*
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
*/


/**
 * get JSON Data
 */
export function fetchData(rblNumber, stopName) {
    return fetchRessource(buildApiUrl(rblNumber), stopName)
/*
    xhrRequest('GET', buildApiUrl(rblNumber))
        .then(function (e) {
            wlXhrResponse = JSON.parse(e.target.response);
            console.log(wlXhrResponse)
        }, function (e) {
            console.log('error loading api ressource'); // handle errors
        });
        */
}

/**
 *
 * @param s
 * @returns {string}
 */

//export function extractLineFromGTFS (s) {
//    return (/[^-]*-([^-]+)-.*/ig).exec(s)[1];
//}

export function extraxtNameFromFilename (s) {
   return (/[^-]*-[^-]*-([^-]+)\..*/ig).exec(s)[1];
}