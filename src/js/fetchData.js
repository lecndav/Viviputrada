/** @file This is the file that gets data gtfs and realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import { xhrRequest } from './xhr.js';
import * as config from "./_config.js";
import { data } from './index.js'
import gtfs2geojson from 'gtfs2geojson'
//import csv from 'csvtojson'

let  wlXhrResponse, rbl = 136, activeTrafficInfo = 'stoerunglang', jsonObject = {};

/**
 * This function gets the shapes & stops from the WL server in GTFS format and calls the gtfs2geojson module to convert the data to geojson
 */

export function gtfsData(url, property){
    /**
     * read GTFS shapes (lines) and concert to geoJSON
     */
    xhrRequest('GET', url)
        .then(function (e) {
            //console.log(e.target.response);
            // delete ' " ' from gtfs file, because they shouldn't be there according to Google's standard https://developers.google.com/transit/gtfs/examples/gtfs-feed
            switch(property) {
                case 'stops': data.setData('gtfs', 'stops', gtfs2geojson.stops(e.target.response.toString().replace('"',''))); break;
                case 'shapes':data.setData('gtfs', 'shapes', gtfs2geojson.lines(e.target.response.toString().replace('"',''))); break;
            }
        }, function (e) {
            console.log('error loading shapes'); // handle errors
        });

}

export function getData() {

    /**
     * get JSON Data
     */
    config.JSON_URLS.forEach(currentValue => {
        xhrRequest('GET', currentValue)
            .then(function (e) {
                data.setData('json',[(/[^-]*-[^-]*-([^-]+)\..*/ig).exec(currentValue)[1]],JSON.parse(e.target.response))
            }, function (e) {
                console.log('error loading JSON files'); // handle errors
            });
    })

    /**
     * API CALL
     */
    xhrRequest('GET', `${config.CORS_DOMAIN}${config.WL_API_BASE_URL}/monitor?rbl=${rbl}&activeTrafficInfo=${activeTrafficInfo}&sender=${config.WL_API_KEY_DEV}`) //
        .then(function (e) {
            //console.log(e.target.response)
            wlXhrResponse = JSON.parse(e.target.response);
            //console.log(wlXhrResponse)
            //console.log(JSON.stringify(wlXhrResponse))
        }, function (e) {
            console.log('error loading api ressource'); // handle errors
        });}

/**
 * TODO: move to helper functions
 * @param s
 * @returns {string}
 */
export function extractLine (s) {
    return (/[^-]*-([^-]+)-.*/ig).exec(s)[1];
}
