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
import geocodeNominatim from './utils/geocodeNominatim.js';
class NodeGeolocation {
    constructor() {
        this.geocodingOptions = {
            service: 'Nominatim',
            key: ''
        };
        this.ipGeolocationOptions = {
            service: 'ipinfo',
            key: ''
        };
    }
    /**
     * @Important **You must set an ipGeolocationOptions before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    getLocation(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ipGeolocationOptions)
                throw new Error('You must set an ipGeolocationOptions before using this method');
            if (this.ipGeolocationOptions.service === 'ip2location') {
                return yield getGeolocationIP2Location(ip, this.ipGeolocationOptions.key);
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
    getGeocoding(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.geocodingOptions)
                throw new Error('You must set a geocodingOptions before using this method');
            if (this.geocodingOptions.service === 'Nominatim') {
                return yield geocodeNominatim(address);
            }
            else {
                throw new Error('Invalid service');
            }
        });
    }
}
export default NodeGeolocation;
