/** @file This data class catches all the Data by using the fetchData module and its functions and stores it in a single object called _fetchedData.
 * This Object is only accessabile by using its functions getFetchedData and setFetchedData
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
// import * as getData from './fetchData.js'
// import * as config from './_config.js'

class Data {
    constructor() {
        let _fetchedData = {};

        /**
         *
         */
        this.initInputs = function () {
            _fetchedData = {
                gtfs: {
                    stops: {},
                    shapes: {}
                },
                json: {
                    haltestellen: {},
                    linien: {},
                    steige: {}
                }
            }
            console.log("Fetched Data:", _fetchedData);
        }
        /*
        this.fetchAllData = function () {
            for (let cat in inputs) {
                data[cat] = {};
                for (let param in inputs[cat]) {
                    data[cat][param]  = inputs[cat][param];
                }
            }
            console.log("Data:", data);
            return data;
        }
        */

        /**
         * TODO: optional parameteres like this?
         * @param cat
         * @param param
         * @returns {*}
         */
        this.getFetchedData = function (cat = '', param = '') {
            if (!cat) {
                return _fetchedData

            } else if (!param) {
                return _fetchedData[cat];

            } else {
                return _fetchedData[cat][param];
            }
        }
        /**
         *
         * @param cat
         * @param param
         * @param value
         */
        this.setFetchedData = function (cat, param, value) {
            _fetchedData[cat][param] = value;
        }
    }
}

export default Data;