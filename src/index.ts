import { getGeolocation } from './ipGeolocation';
import { GeolocationData } from './types';
import IPinfoWrapper from 'node-ipinfo';

class NodeGeolocation {

    public key: string = '';
    public ipinfo = new IPinfoWrapper(this.key);

    constructor(key: string) {
        this.key = key;
    }

    public async getLocation(ip: string): Promise<GeolocationData> {
        return await getGeolocation(ip, this.ipinfo);
    };
}

module.exports = NodeGeolocation;