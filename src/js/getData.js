/** @file This is the file that gets data gtfs and realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import { xhrRequest } from './xhr.js';
import { SHAPES_URL, STOPS_URL } from './_config.js';
import { WL_API_KEY, WL_API_KEY_DEV, WL_API_EXAMPLE_URL, WL_API_BASE_URL, CURS_DOMAIN } from "./_config.js";
import gtfs2geojson from 'gtfs2geojson'

let shapesJSON, stopsJSON, wlXhrResponse, rbl = 136, activeTrafficInfo = 'stoerunglang';

/**
 * This function gets the shapes & stops from the WL server in GTFS format and calls the gtfs2geojson module to convert the data to geojson
 */
export function getData() {
    xhrRequest('GET', SHAPES_URL)
        .then(function (e) {
            //console.log(e.target.response);
            shapesJSON = gtfs2geojson.lines(e.target.response.toString().replace('"','')); // delete ' " ' from gtfs file, because they shouldn't be there according to Google's standard https://developers.google.com/transit/gtfs/examples/gtfs-feed
            //console.log(shapesJSON)
        }, function (e) {
            console.log('error loading shapes'); // handle errors
        });

    xhrRequest('GET', STOPS_URL)
        .then(function (e) {
            stopsJSON = gtfs2geojson.stops(e.target.response.toString().replace('"',''));
            //console.log(stopsJSON)
        }, function (e) {
            console.log('error loading stops'); // handle errors
        });

    xhrRequest('GET', CURS_DOMAIN + WL_API_BASE_URL + '/monitor?rbl=' + rbl + '&activeTrafficInfo=' + activeTrafficInfo + '&sender=' + WL_API_KEY_DEV)
        .then(function (e) {
            console.log(e.target.response)
            wlXhrResponse = e.target.response.toString().replace('"','');
            //console.log(wlXhrResponse)
            //console.log(JSON.stringify(wlXhrResponse))
        }, function (e) {
            console.log('error loading api ressource'); // handle errors
        })
}

/**
 *
 * @param s
 * @returns {string}
 */
export function extractLine (s) {
    return (/[^-]*-([^-]+)-.*/ig).exec(s)[1];
}

export {shapesJSON, stopsJSON}