/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import { getData } from './getData';
import { drawMap } from './drawMap';

getData();
drawMap();

/*
    import { xhrRequest } from './xhr.js';
    xhrRequest('GET', '/geojson/paths.json').then(result => console.log("TEST LOAD", result));
*/