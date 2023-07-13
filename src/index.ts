import getGeolocationIPInfo from './utils/ipInfoGeolocation.js';
import getGeolocationIP2Location from './utils/ip2locationGeolocation.js';
import { GeolocationData, Position, Options } from './types.js';
import IPinfoWrapper from 'node-ipinfo';
import calculateDistance from './utils/distanceCalculation.js';

class NodeGeolocation {

    private _key: string = '';
    private _ipinfo: IPinfoWrapper = new IPinfoWrapper(this._key);
    public service: 'ipinfo' | 'ip2location' = 'ipinfo';

    constructor(service: 'ipinfo' | 'ip2location', key: string) {
        this.service = service;
        this._key = key;
        if (this.service === 'ipinfo') {
            this._ipinfo = new IPinfoWrapper(this._key);
        }
    }

    set key(key: string) {
        this._key = key;
        this._ipinfo = new IPinfoWrapper(this._key);
    }

    get key(): string {
        return this._key;
    }

    /**
     * @key **You must set a service and an api key before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    public async getLocation(ip: string): Promise<GeolocationData | void> {
        if (!this._key) throw new Error('You must set a service and an api key before using this method');
        if (this.service === 'ip2location') {
            return await getGeolocationIP2Location(ip, this._key);
        } else if (this.service === 'ipinfo') {
            return await getGeolocationIPInfo(ip, this._ipinfo);
        }
    };

    /**
     * Calculates the distance between two points on earth using the haversine formula
     * @param pos1 First point
     * @param pos2 Second point
     * @param options Options for the calculation
     * @default options = { unit: 'km', format: false, exact: false }
     * @returns The distance between the two points
     */
    public calculateDistance(pos1: Position, pos2: Position, options?: Options): number | string {
        return calculateDistance(pos1, pos2, options);
    }
}

export default NodeGeolocation;