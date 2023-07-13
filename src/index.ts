import { getGeolocation } from './ipGeolocation';
import { GeolocationData } from './types';
import IPinfoWrapper from 'node-ipinfo';

class NodeGeolocation {

    private _key: string = '';
    private _ipinfo: IPinfoWrapper = new IPinfoWrapper('');

    constructor(key: string) {
        this._key = key;
        this._ipinfo = new IPinfoWrapper(this._key);
    }

    set key(key: string) {
        this._key = key;
        this._ipinfo = new IPinfoWrapper(this._key);
    }

    get key(): string {
        return this._key;
    }

    /**
     * @IMPORTANT **You must set the api key before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    public async getLocation(ip: string): Promise<GeolocationData | void> {
        return await getGeolocation(ip, this._ipinfo);
    };
}

module.exports = NodeGeolocation;