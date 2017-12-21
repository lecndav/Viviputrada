/** @file This class Station ... TODO
 * @version 0.2
 * @author Michael Dunkel <michael.dunkel@technikum-wien.at>
 */
import { data } from './index.js'

export class Station {
    constructor(name) {
        this._name = name
        this._lon = data.getFetchedData('json','haltestellen')
        console.log(this._lon)
    }
}
export default Station