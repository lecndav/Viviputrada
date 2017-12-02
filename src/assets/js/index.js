/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import mapboxgl from 'mapbox-gl'
import turf from '@turf/turf'

const lngLatOfVienna = [16.363449, 48.210033]; // The inital geographical centerpoint of the map. Note: Mapbox GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
const mapboxStyle = 'mapbox://styles/mapbox/dark-v9'; // The map's Mapbox style. This must be an a JSON object conforming to the schema described in the Mapbox Style Specification , or a URL to such JSON.
const mapboxHtmlContainerID = 'map'; // The HTML element in which Mapbox GL JS will render the map, or the element's string id . The specified element must have no children.
const mapboxZoomLvl = 11; // The initial zoom level of the map. If  zoom is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to  0 .
const mapboxDragPan = false; // If true, the 'drag to pan' interaction is enabled
const mapboxDragRotate = true; // If true, the 'drag to rotate' interaction is enabled
const mapboxBearingSnap = 7; // The threshold, measured in degrees, that determines when the map's bearing (rotation) will snap to north.

/** Mapbox Setup   
 *
 */
mapboxgl.accessToken = 'pk.eyJ1IjoibWR1bmtlbCIsImEiOiJjamFiM3Yxem8wbmswMzNxdHhoa2w1aWVpIn0.67dORj80QYe7k9CoQg-Fmw';
var map = new mapboxgl.Map({
    container: mapboxHtmlContainerID,
    style: mapboxStyle,
    center: lngLatOfVienna,
    zoom: mapboxZoomLvl,
    pitchWithRotate: mapboxDragPan,
    dragRotate: mapboxDragRotate,
    bearingSnap: mapboxBearingSnap
});

/**
 * draw map
 */
map.on('load', function(){
    map.addSource('subways', {
        'type': 'geojson',
        'data': './map.geojson'
        }
    )
    map.addLayer({
        'id': 'subwayLines',
        'type': 'LineString',
        'source': 'subways',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    })
})

/*
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
*/