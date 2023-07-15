var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getGeolocationIPInfo from './utils/ipInfoGeolocation.js';
import getGeolocationIP2Location from './utils/ip2locationGeolocation.js';
import IPinfoWrapper from 'node-ipinfo';
import calculateDistance from './utils/distanceCalculation.js';
import { geocodeNominatim, reverseGeocodeNominatim } from './utils/geocodeNominatim.js';
class NodeGeolocation {
    constructor(applicationName) {
        this._id = '';
        this.geocodingOptions = {
            service: 'Nominatim',
            key: ''
        };
        this.ipGeolocationOptions = {
            service: 'ipinfo',
            key: ''
        };
        this._id = `nodejs-geolocation-${applicationName}-${Math.floor(Math.random() * 100)}`;
    }
    /**
     * @Important **You must set ipGeolocationOptions object before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    getLocation(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ipGeolocationOptions)
                throw new Error('You must set ipGeolocationOptions object before using this method');
            if (this.ipGeolocationOptions.service === 'ip2location') {
                return yield getGeolocationIP2Location(ip, this.ipGeolocationOptions.key, this._id);
            }
            else if (this.ipGeolocationOptions.service === 'ipinfo') {
                const ipinfo = new IPinfoWrapper(this.ipGeolocationOptions.key);
                return yield getGeolocationIPInfo(ip, ipinfo);
            }
            else {
                throw new Error('Invalid service');
            }
        });
    }
    ;
    /**
     * Calculates the distance between two points on earth using the haversine formula
     * @param pos1 First point
     * @param pos2 Second point
     * @param options Options for the calculation
     * @default options = { unit: 'km', format: false, exact: false }
     * @returns The distance between the two points
     */
    calculateDistance(pos1, pos2, options) {
        return calculateDistance(pos1, pos2, options);
    }
    /**
     * Get geocoding data from an address
     * @Important **You must set geocodingOptions object before using this method**
     * @param address Address string to geocode
     * @returns Geocoding data
     */
    getGeocoding(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.geocodingOptions)
                throw new Error('You must set geocodingOptions object before using this method');
            if (this.geocodingOptions.service === 'Nominatim') {
                return yield geocodeNominatim(address, this._id);
            }
            else {
                throw new Error('Invalid service');
            }
        });
    }
    /**
     * Get reverse geocoding data from a position
     * @Important **You must set geocodingOptions object before using this method**
     * @param pos Position to reverse geocode
     * @returns Reverse geocoding data
     */
    getReverseGeocoding(pos) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.geocodingOptions)
                throw new Error('You must set geocodingOptions object before using this method');
            let lat;
            let lon;
            if ('lat' in pos && 'lon' in pos) {
                lat = pos.lat;
                lon = pos.lon;
            }
            else if ('latitude' in pos && 'longitude' in pos) {
                lat = pos.latitude;
                lon = pos.longitude;
            }
            else if ('x' in pos && 'y' in pos) {
                lat = pos.x;
                lon = pos.y;
            }
            else {
                throw new Error('Invalid position');
            }
            if (this.geocodingOptions.service === 'Nominatim') {
                return yield reverseGeocodeNominatim(lat, lon, this._id);
            }
            else {
                throw new Error('Invalid service');
            }
        });
    }
}
export default NodeGeolocation;
