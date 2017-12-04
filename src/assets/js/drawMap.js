/** @file draw the map
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import mapboxgl from 'mapbox-gl'
import {shapesJSON, stopsJSON} from "./getData.js";
import { mapboxHtmlContainerID, mapboxStyle, lngLatOfVienna, mapboxZoomLvl, mapboxDragPan, mapboxDragRotate, mapboxBearingSnap} from './index.js'

/**
 * Mapbox Setup
 */
export function drawMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWR1bmtlbCIsImEiOiJjamFiM3Yxem8wbmswMzNxdHhoa2w1aWVpIn0.67dORj80QYe7k9CoQg-Fmw';
    let map = new mapboxgl.Map({
        container: mapboxHtmlContainerID,
        style: mapboxStyle,
        center: lngLatOfVienna,
        zoom: mapboxZoomLvl,
        pitchWithRotate: mapboxDragPan,
        dragRotate: mapboxDragRotate,
        bearingSnap: mapboxBearingSnap
    });

    map.on('load', function () {
        /**
         * This is a function to get the index of the first symbol layer in the map style in order to put shapes and stops under it
         * https://www.mapbox.com/mapbox-gl-js/example/geojson-layer-in-stack/
         */
        let layers = map.getStyle().layers;
        let firstSymbolId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol') {
                firstSymbolId = layers[i].id;
                break;
            }
        }

        map.addSource('shapes', {
                'type': 'geojson',
                'data': shapesJSON
            }
        )
        map.addSource('stops', {
                'type': 'geojson',
                'data': stopsJSON
            }
        )
        map.addLayer({
            'id': 'shapes',
            'type': 'line',
            'source': 'shapes',
            'layout': {
                'line-join': 'round',
                'line-round-limit': 1,
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#e4493d',
                'line-width': 2.5,
                'line-blur': 10
            }
        }, firstSymbolId)
        map.addLayer({
            'id': 'stops',
            'type': 'circle',
            'source': 'stops',
            'layout': {},
            'paint': {
                'circle-color': '#fff',
                'circle-radius': 2.5 ,
                'circle-blur': 1
            }
        }, firstSymbolId)
    })
}

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

