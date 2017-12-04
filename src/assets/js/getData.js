/** @file This is the file that gets data gtfs and realtime data
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import gtfs2geojson from 'gtfs2geojson' //TODO: richtig oder require?
import { xhrRequest } from './xhr.js';
import { shapesURL, stopsURL } from './index.js';
export let shapesJSON, stopsJSON;

export function getData() {
    xhrRequest('GET', shapesURL)
        .then(function (e) {
            //console.log(e.target.response);
            shapesJSON = gtfs2geojson.lines(e.target.response.toString().replace('"',''));
            //console.log(shapesJSON)
        }, function (e) {
            console.log('error');// handle errors
        });

    xhrRequest('GET', stopsURL)
        .then(function (e) {
            stopsJSON = gtfs2geojson.stops(e.target.response.toString().replace('"',''));
        }, function (e) {
            console.log('error');// handle errors
        });
}