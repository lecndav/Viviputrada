// import * as getData from './fetchData.js'
// import * as config from './_config.js'

class Data {
    constructor() {
        let _fetchedData = {}

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
            return _fetchedData;
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
        this.getFetchedData = function (cat = '', param = '') {
            if (!cat) {
                return _fetchedData

            } else if (!param) {
                return _fetchedData[cat];

            } else {
                return _fetchedData[cat][param];
            }
        }
        this.setFetchedData = function (cat, param, value) {
            _fetchedData[cat][param] = value;
        }
    }
}

export default Data;