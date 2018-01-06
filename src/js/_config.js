/** @file file to change configuration
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

export const LNG_LAT_OF_VIENNA = [16.363449, 48.210033] // The inital geographical centerpoint of the map. Note: Mapbox GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWR1bmtlbCIsImEiOiJjamFiM3Yxem8wbmswMzNxdHhoa2w1aWVpIn0.67dORj80QYe7k9CoQg-Fmw'
export const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9' // The map's Mapbox style. This must be an a JSON object conforming to the schema described in the Mapbox Style Specification, or a URL to such JSON.
export const MAPBOX_HTML_CONTAINER_ID = 'map' // The HTML element in which Mapbox GL JS will render the map, or the element's string id . The specified element must have no children.
export const MAPBOX_ZOOM_LVL = 12 // The initial zoom level of the map. If zoom is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to  0 .
export const MAPBOX_DRAG_PAN = true // If true, the 'drag to pan' interaction is enabled
export const MAPBOX_DRAG_ROTATE = true // If true, the 'drag to rotate' interaction is enabled
export const MAPBOX_BEARING_SNAP = 14 // The threshold, measured in degrees, that determines when the map's bearing (rotation) will snap to north.
export const MAPBOX_GEOCORDER = 'at' // Shows only search results for this country
export const MAPBOX_BBOX = [16.182778, 48.118333, 16.578611, 48.323056] // Coordiantes of a Frame around Vienna
export const SHAPES_GTFS_URL = '/geojson/shapes.txt' // Ressource from 'https://www.data.wien.gv.at/txt/wrlinien-gtfs-shapes.txt'
export const STOPS_GTFS_URL = '/geojson/stops.txt' // Ressource from 'https://www.data.wien.gv.at/txt/wrlinien-gtfs-stops.txt' stored locally to avoid charset issues
export const WL_API_KEY_DEV = '6qkYCWmnCN27xxfi' // Development-key to transmit as 'sender' parameter for api requests at the realtime data api from Wiener Linien. Restricted to 100 requests per minute.
export const WL_API_KEY = 'VxFSXGDhGJm59LWY' // Key to transmit as 'sender' parameter for api requests at the realtime data api from Wiener Linien
export const WL_API_EXAMPLE_URL = 'http://www.wienerlinien.at/ogd_realtime/monitor?rbl=147&activateTrafficInfo=stoerungkurz&activateTrafficInfo=stoerunglang&activateTrafficInfo=aufzugsinfo&sender='
export const WL_API_BASE_URL = 'http://www.wienerlinien.at/ogd_realtime' // from http://data.wien.gv.at/pdf/wienerlinien-echtzeitdaten-dokumentation.pdf
export const WL_ACTIVE_TRAFFIC_INFO = 'stoerunglang';
export const CORS_DOMAIN = 'https://cors-anywhere.herokuapp.com/' // Prefix this to avoid same origin browser policy. It adds a CORS header to the fetch() response.