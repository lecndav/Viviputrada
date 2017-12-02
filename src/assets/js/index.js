/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import mapboxgl from 'mapbox-gl'
import turf from '@turf/turf'

const lngLatOfVienna = [16.363449, 48.210033];
const mapboxTheme = 'mapbox://styles/mapbox/dark-v9';
const mapboxHtmlContainerID = 'map';
const mapboxZoomLvl = 11;

/** Mapbox Setup
 * Attention: order = longitude, latitude.
 */
mapboxgl.accessToken = 'pk.eyJ1IjoibWR1bmtlbCIsImEiOiJjamFiM3Yxem8wbmswMzNxdHhoa2w1aWVpIn0.67dORj80QYe7k9CoQg-Fmw';
var map = new mapboxgl.Map({
    container: mapboxHtmlContainerID, // ID of container object
    style: mapboxTheme, // style dark or light
    center: lngLatOfVienna, // starting position
    zoom: mapboxZoomLvl // starting zoom, je höher die zahl, desto mehr ist hineingezoomed
});

/**
 * draw map
 */
map.on('load', function () {
    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [16.363449, 48.210033]
                    },
                    'properties': {
                        'title': 'Center of Vienna',
                        'icon': 'monument'
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [16.3568842,48.2284994]
                    },
                    'properties': {
                        'title': 'test',
                        'icon': 'circle'
                    }
                }]
            }
        },
        'layout': {
            'icon-image': '{icon}-15',
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
        }
    });
});