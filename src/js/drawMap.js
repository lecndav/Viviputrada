/** @file draw the map
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from './_config.js'
import { parseLines, parseStops } from './jsonToGeoJson.js';
import * as getData from './fetchData.js';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import steige from '../assets/json/wienerlinien-ogd-steige.json'
// import turf from '@turf/turf'

function getInfos (e) {
    const stopID = e.features[0].properties.stop_id
    const stopName = e.features[0].properties.stop_name

    // filter all plattforms (='steige') that are combined in that stop (='haltestelle')
    const steigeInHaltestelle = steige.filter(
        function(steige){
            return steige.FK_HALTESTELLEN_ID == e.features[0].properties.stop_id
        }
    )

    // Store all  rbl numbers in a Set to avoid duplicates
    const rblNumbers = function(numbers = new Set()){
        for (let i in steigeInHaltestelle){
            if(steigeInHaltestelle[i].RBL_NUMMER){
                numbers.add(steigeInHaltestelle[i].RBL_NUMMER)
            }
        }
        return numbers
    }

    // Only make an API call, if there are rbl (=realtime data) available for this stop.
    if(rblNumbers().size) {
        getData.fetchData(rblNumbers())
    } else {
        updatePopup(0)
    }

    return `<h1>${stopName}</h1>`}

export function updatePopup(data){
    console.log(data)
    let div = document.getElementById('popupWithRealtimeData')
    let divContent = ''
    if (!data){
        divContent = 'no realtime data'
        console.log(divContent)
    } else {
        divContent = `
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Line</th>
              <th scope="col">Towards</th>
              <th scope="col">Departure</th>
            </tr>
          </thead>
          <tbody>`
        for(let i in data.data.monitors){
            for (let j in data.data.monitors[i].lines){
                divContent += `
                <tr>
                  <th scope="row">${data.data.monitors[i].lines[j].name}</th>
                  <td>${data.data.monitors[i].lines[j].towards}</td>
                  <td>${data.data.monitors[i].lines[j].departures.departure[0].departureTime.countdown} min</td>
                </tr>`
            }
        }
        divContent += '</tbody>' +
            '</table>'
    }
    console.log(`after if ${divContent}`)
    div.innerHTML = divContent
}

export function drawMap() {
    /**
     * 
     */
    let lines = parseLines(), stops = parseStops()
    //console.log(stops)

    /**
     * initialize map
     */
    mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
    let map = new mapboxgl.Map({
        container: config.MAPBOX_HTML_CONTAINER_ID,
        style: config.MAPBOX_STYLE,
        center: config.LNG_LAT_OF_VIENNA,
        zoom: config.MAPBOX_ZOOM_LVL,
        pitchWithRotate: config.MAPBOX_DRAG_PAN,
        dragRotate: config.MAPBOX_DRAG_ROTATE,
        bearingSnap: config.MAPBOX_BEARING_SNAP
    });

    /**
     *
     */
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
        /**
         * add Layers: shapes (lines), stops (circle)
         */
        /*
        map.addSource('shapes',{
            'type': 'geojson',
            'data': lines
        })*/

        map.addSource('stops', {
            'type': 'geojson',
            'data': stops
            // 'cluster': true,
            // 'clusterMaxZoom': 20, // Max zoom to cluster points on
            // 'clusterRadius': 5 // Radius of each cluster when clustering points (defaults to 50)
        })

        /*
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
                    'stops': [[7, 0], [10, 2], [18, 40]]
                },
                'line-blur': {
                    'base': 10,
                    'stops':[[12, 5], [22, 15]]
                }
            }
        }, firstSymbolId)
        */
        map.addLayer({
            'id': 'stops',
            'type': 'circle',
            'source': 'stops',
            'layout': {},
            'paint': {
                'circle-color': '#fff',
                'circle-radius': {
                    'base': 4,
                    'stops': [[5, 0], [12, 4], [16, 15], [20, 100]]
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
    /*
    map.on('click', 'shapes', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.shape_id)
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
*/
    // When a click event occurs on a feature in the shapes, open a popup at the
    // location of the click, with description HTML from its properties.

    map.on('click', 'stops', function (e) {
        let div = window.document.createElement('div')
        div.setAttribute('id', 'popupWithRealtimeData')
        div.innerHTML = getInfos(e);
        let popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setDOMContent(div)
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

    // add Geocoder
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        country: config.MAPBOX_GEOCORDER,
        placeholder: 'Suche',
        bbox: [16.182778, 48.118333, 16.578611, 48.323056] //frame aroung Vienna
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