/** @file This is the file that gets data gtfs and realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import gtfs2geojson from 'gtfs2geojson' //TODO: richtig oder require?
import { xhrRequest } from './xhr.js';
import { shapesURL, stopsURL } from './index.js';
export let shapesJSON, stopsJSON;

/** This function gets the shapes & stops from the WL server in GTFS format and calls the gtfs2geojson module to convert the data to geojson
 *
 */
export function getData() {
    xhrRequest('GET', shapesURL)
        .then(function (e) {
            //console.log(e.target.response);
            shapesJSON = gtfs2geojson.lines(e.target.response.toString().replace('"',''));
            console.log(shapesJSON)
        }, function (e) {
            console.log('error');// handle errors
        });

    xhrRequest('GET', stopsURL)
        .then(function (e) {
            stopsJSON = gtfs2geojson.stops(e.target.response.toString().replace('"',''));
            console.log(stopsJSON)
        }, function (e) {
            console.log('error');// handle errors
        });
}

export function extractLine (s) {
    s = s.slice(s.indexOf("-")+1);
    s = s.substring(0, s.indexOf('-'));
    return s;
}