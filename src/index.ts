import getGeolocationIPInfo from './utils/ipInfoGeolocation.js';
import getGeolocationIP2Location from './utils/ip2locationGeolocation.js';
import { GeolocationData, Position, DistanceCalculationOptions, GeocodingOptions, IPGeolocationOptions, Unit } from './types.js';
import IPinfoWrapper from 'node-ipinfo';
import calculateDistance from './utils/distanceCalculation.js';
import { geocodeNominatim, reverseGeocodeNominatim } from './utils/geocodeNominatim.js';

class NodeGeolocation {

    private _id: string = '';

    constructor(applicationName: string) {
        this._id = `nodejs-geolocation-${applicationName}-${Math.floor(Math.random() * 100)}`;
    }

    public geocodingOptions: GeocodingOptions = {
        service: 'Nominatim',
        key: ''
    };

    public ipGeolocationOptions: IPGeolocationOptions = {
        service: 'ipinfo',
        key: ''
    };

    /**
     * Get geolocation from ip address
     * @Important **You must set ipGeolocationOptions object before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    public async getLocation(ip: string): Promise<GeolocationData | void> {
        if (!this.ipGeolocationOptions) throw new Error('You must set ipGeolocationOptions object before using this method');
        if (this.ipGeolocationOptions.service === 'ip2location') {
            return await getGeolocationIP2Location(ip, this.ipGeolocationOptions.key, this._id);
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
     * Get geocoding data from an address
     * @Important **You must set geocodingOptions object before using this method**
     * @param address Address string to geocode
     * @returns Geocoding data
     */
    public async getGeocoding(address: string): Promise<any> {
        if (!this.geocodingOptions) throw new Error('You must set geocodingOptions object before using this method');
        if (this.geocodingOptions.service === 'Nominatim') {
            return await geocodeNominatim(address, this._id);
        } else {
            throw new Error('Invalid service');
        }
    }

    /**
     * Get reverse geocoding data from a position
     * @Important **You must set geocodingOptions object before using this method**
     * @param pos Position to reverse geocode
     * @returns Reverse geocoding data
     */
    public async getReverseGeocoding(pos: Position): Promise<any> {
        if (!this.geocodingOptions) throw new Error('You must set geocodingOptions object before using this method');

        let lat: number;
        let lon: number;

        if ('lat' in pos && 'lon' in pos) {
            lat = pos.lat;
            lon = pos.lon;
        } else if ('latitude' in pos && 'longitude' in pos) {
            lat = pos.latitude;
            lon = pos.longitude;
        } else if ('x' in pos && 'y' in pos) {
            lat = pos.x;
            lon = pos.y;
        } else {
            throw new Error('Invalid position');
        }

        if (this.geocodingOptions.service === 'Nominatim') {
            return await reverseGeocodeNominatim(lat, lon, this._id);
        } else {
            throw new Error('Invalid service');
        }
    }

    /**
     * Built-in unit converter
     * @param value Value to convert
     * @param from Unit to convert from
     * @param to Unit to convert to
     * @returns Converted value
     */
    public convertUnit(value: number, from: Unit, to: Unit): number {
        const units: { [key: string]: number; } = {
            km: 1000,
            m: 1,
            mi: 1609.34,
            yd: 0.9144,
            ft: 0.3048
        };

        const result = value * units[from] / units[to];

        return result;
    }
}

export default NodeGeolocation;