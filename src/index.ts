import getGeolocationIPInfo from './utils/ipInfoGeolocation.js';
import getGeolocationIP2Location from './utils/ip2locationGeolocation.js';
import { GeolocationData, Position, DistanceCalculationOptions, GeocodingOptions, IPGeolocationOptions } from './types.js';
import IPinfoWrapper from 'node-ipinfo';
import calculateDistance from './utils/distanceCalculation.js';
import geocodeNominatim from './utils/geocodeNominatim.js';

class NodeGeolocation {

    public geocodingOptions: GeocodingOptions = {
        service: 'Nominatim',
        key: ''
    };

    public ipGeolocationOptions: IPGeolocationOptions = {
        service: 'ipinfo',
        key: ''
    };

    /**
     * @Important **You must set ipGeolocationOptions object before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    public async getLocation(ip: string): Promise<GeolocationData | void> {
        if (!this.ipGeolocationOptions) throw new Error('You must set an ipGeolocationOptions before using this method');
        if (this.ipGeolocationOptions.service === 'ip2location') {
            return await getGeolocationIP2Location(ip, this.ipGeolocationOptions.key);
        } else if (this.ipGeolocationOptions.service === 'ipinfo') {
            const ipinfo = new IPinfoWrapper(this.ipGeolocationOptions.key);
            return await getGeolocationIPInfo(ip, ipinfo);
        } else {
            throw new Error('Invalid service');
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
    public calculateDistance(pos1: Position, pos2: Position, options?: DistanceCalculationOptions): number | string {
        return calculateDistance(pos1, pos2, options);
    }

    /**
     * @Important **You must set geocodingOptions object before using this method**
     * @param address Address string to geocode
     * @returns Geocoding data
     */
    public async getGeocoding(address: string): Promise<any> {
        if (!this.geocodingOptions) throw new Error('You must set a geocodingOptions before using this method');
        if (this.geocodingOptions.service === 'Nominatim') {
            return await geocodeNominatim(address);
        } else {
            throw new Error('Invalid service');
        }
    }
}

export default NodeGeolocation;