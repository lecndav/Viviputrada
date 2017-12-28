/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from './_config.js';
import Data from './Data.js';
import * as getData from './fetchData.js';
import { drawMap } from './drawMap.js';

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
