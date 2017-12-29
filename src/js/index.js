/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from './_config.js';
import * as getData from './fetchData.js';
import { drawMap } from './drawMap.js';
//import Data from './Data.js';

/**
 * TODO: Search at mobile devices is buggy
 * TODO: Search results only for Vienna / Vienna first
 * TODO: function getInfos (e) into own module
 * TODO: JSONP instead of CORS Domain
  */

/**
 * Create a new instance of the Data object
 * @type {Data}
 */

//export let data = new Data()

/**
 * Fill Data
 */
//data.initInputs()
//getData.gtfsData(config.STOPS_GTFS_URL, 'stops')
//getData.gtfsData(config.SHAPES_GTFS_URL, 'shapes')
//getData.fetchData();

/**
 * draw Map
 */
drawMap();
