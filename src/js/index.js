/** @file This is the entry file
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import * as config from "./_config";
import Data from "./data";
import * as getData from './fetchData';
import { drawMap } from './drawMap';

/**
 * Create a new instance of the Data Class
 * @type {Data}
 */
export let data = new Data()
data.initInputs()
//data.fetchAllData()

getData.gtfsData(config.STOPS_GTFS_URL, 'stops')
getData.gtfsData(config.SHAPES_GTFS_URL, 'shapes')

getData.fetchData();
drawMap();
