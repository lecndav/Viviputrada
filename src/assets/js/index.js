/**
 * @file This is the entry file
 * @version 0.1
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWR1bmtlbCIsImEiOiJjamFiM3Yxem8wbmswMzNxdHhoa2w1aWVpIn0.67dORj80QYe7k9CoQg-Fmw';
var map = new mapboxgl.Map({
    container: 'map', // ID of container object
    style: 'mapbox://styles/mapbox/dark-v9', // style
    center: [16.363449, 48.210033], // starting position
    zoom: 10 // starting zoom
});

console.log("hello world2")