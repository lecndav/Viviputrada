/** @file draw the map
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import mapboxgl from 'mapbox-gl'
import { shapesJSON, stopsJSON, extractLine } from './getData.js';
import { mapboxHtmlContainerID, mapboxStyle, lngLatOfVienna, mapboxZoomLvl, mapboxDragPan, mapboxDragRotate, mapboxBearingSnap } from './index.js'

let MapboxGeocoder = require('mapbox-gl-geocoder');

/**
 *
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
         * There are two ways to achieve the correct layer ordering:
         * Move a layer after it has been added with map.moveLayer: https://www.mapbox.com/mapbox-gl-js/api/#map#movelayer
         * Or define where in the layer stack the layer should be added by supplying a beforeLayer as a second parameter when calling map.addLayer(options, beforeLayer).
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
                'line-width': {
                    'base': 3.5,
                    'stops': [[5, 0], [10, 3], [18, 50]]
                },
                'line-blur': 15
            }
        }, firstSymbolId)
        map.addLayer({
            'id': 'stops',
            'type': 'circle',
            'source': 'stops',
            'layout': {},
            'paint': {
                'circle-color': '#fff',
                'circle-radius': {
                    'base': 1.75,
                    'stops': [[5, 0], [12, 2], [22, 100]]
                },
                'circle-blur': {
                    'base': .5,
                    'stops':[[12, .3], [22, .1]]
                }
            }
        }, firstSymbolId)
    })

    // When a click event occurs on a feature in the shapes, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'shapes', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(extractLine(e.features[0].properties.shape_id))
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the shapes.
    map.on('mouseenter', 'shapes', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'shapes', function () {
        map.getCanvas().style.cursor = '';
    });

    // When a click event occurs on a feature in the shapes, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'stops', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.stop_name)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the shapes.
    map.on('mouseenter', 'stops', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'stops', function () {
        map.getCanvas().style.cursor = '';
    });

    // add geocoder
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        country: 'at'
    }));

    // Add geolocate control to the map.
    // requires sites to be served over HTTPS
   map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

}