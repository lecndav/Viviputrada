import * as getData from './fetchData.js'
import * as config from './_config.js'

class Data {
    constructor() {
        let inputs = {}
        let data = {}

        this.initInputs = function () {
            inputs = {
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
            console.log("INPUT ELEMENTS:", inputs);
            return inputs;
        }
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
        this.getData = function (cat = '', param = '') {
            if (!cat) {
                return data

            } else if (!param) {
                return data[cat];

            } else {
                return data[cat][param];
            }
        }
        this.setData = function (cat, param, value) {
            data[cat][param] = value;
        }
    }
}

export default Data;

/*
class Data {
    constructor(){
        this._files = this.readFiles()
        this._data = this.fetchData()
    }

    readFiles() {
        const responses = {
            gtfs : {
                stops : getData.gtfsData(config.STOPS_GTFS_URL, 'stops'),
                shapes : getData.gtfsData(config.SHAPES_GTFS_URL, 'shapes')
            }
        }
        return responses
    }

    fetchData() {
        let data = {};
        for (let cat in this._files) {
            data[cat] = {};
            for (let param in this._files[cat]) {
                data[cat][param] = this._files.value
            }
        }
        return data;
    }

    getData(cat = '', param = ''){
        if (!cat) {
            return this._data

        } else if (!param) {
            return this._data[cat];

        } else {
            return this._data[cat][param];
        }
    }
}
export default Data
*/