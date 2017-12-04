/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import turf from '@turf/turf'

import { getData } from "./getData";
import { drawMap } from './drawMap'

export const lngLatOfVienna = [16.363449, 48.210033]; // The inital geographical centerpoint of the map. Note: Mapbox GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
export const mapboxStyle = 'mapbox://styles/mapbox/dark-v9'; // The map's Mapbox style. This must be an a JSON object conforming to the schema described in the Mapbox Style Specification , or a URL to such JSON.
export const mapboxHtmlContainerID = 'map'; // The HTML element in which Mapbox GL JS will render the map, or the element's string id . The specified element must have no children.
export const mapboxZoomLvl = 12; // The initial zoom level of the map. If zoom is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to  0 .
export const mapboxDragPan = true; // If true, the 'drag to pan' interaction is enabled
export const mapboxDragRotate = true; // If true, the 'drag to rotate' interaction is enabled
export const mapboxBearingSnap = 14; // The threshold, measured in degrees, that determines when the map's bearing (rotation) will snap to north.
export const shapesURL = 'https://www.data.wien.gv.at/txt/wrlinien-gtfs-shapes.txt'
export const stopsURL = 'https://www.data.wien.gv.at/txt/wrlinien-gtfs-stops.txt'

getData();
drawMap();
