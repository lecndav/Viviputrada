/** @file converts json input data from Wiener Linien to geoJson for usage in Mapbox GL JS
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */

import haltestellen from '../json/wienerlinien-ogd-haltestellen.json';
import strecken from '../json/wienerlinien-ogd-teilstrecken-lonlat.json';
//import steige from '../json/wienerlinien-ogd-steige.json';

export function parseLines() {
    // console.log(haltestellen[0]);

    // var hs = haltestellen.reduce(function(map, row) {
    //   row.steige = [];
    //   map[row.HALTESTELLEN_ID] = row;

    //   return map;
    // }, {});

    // steige.array.forEach(element => {
    //   hs[element.FK_HALTESTELLEN_ID].push(element);
    // });

    const shapes = strecken.reduce(function(map, row) {
        const key = row.FK_STEIG_ID_VON + '-' + row.FK_STEIG_ID_NACH;
        const coords = {
            shape_pt_lon: row.WGS84_LON,
            shape_pt_lat: row.WGS84_LAT,
            shape_pt_sequence: row.REIHENFOLGE,
        };

        map[key] = (map[key] || []).concat(coords);

        return map;
    }, {});

    return {
        type: 'FeatureCollection',
        features: Object.keys(shapes).map(function(id) {
            return {
                type: 'Feature',
                id,
                properties: {
                    shape_id: id
                },
                geometry: {
                    type: 'LineString',
                    coordinates: shapes[id].sort(function(a, b) {
                        return a.shape_pt_sequence - b.shape_pt_sequence;
                    }).map(function(coord) {
                        return [
                            coord.shape_pt_lon,
                            coord.shape_pt_lat
                        ];
                    })
                }
            };
        })
    };

//    return geojson;
}

export function parseStops() {
    const stops = haltestellen.reduce(function(map, row) {
        const key = row.HALTESTELLEN_ID;
        const stop = {
            stop_name: row.NAME,
            stop_id: row.HALTESTELLEN_ID,
            stop_lon: row.WGS84_LON,
            stop_lat: row.WGS84_LAT,
        };

        map[key] = stop;

        return map;
    }, {});

    return {
        type: 'FeatureCollection',
        features: Object.keys(stops).map(function(id) {
            return {
                type: 'Feature',
                id: stops[id].stop_id,
                properties: {
                    stop_id: stops[id].stop_id,
                    stop_name: stops[id].stop_name
                },
                geometry: {
                    type: 'Point',
                    coordinates: [
                        stops[id].stop_lon,
                        stops[id].stop_lat
                    ]
                }
            };
        })
    };
}
