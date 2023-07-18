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
import calculateDistance from './utils/distanceCalculation.js';
import { geocodeNominatim, reverseGeocodeNominatim } from './utils/geocodeNominatim.js';
import { geocodeHere, reverseGeocodeHere } from './utils/geocodeHere.js';
/**
 * NodeGeolocation class
 * @constructor (applicationName: string)
 * @docs [Documentation](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/README.md)
 */
class NodeGeolocation {
    constructor(applicationName) {
        this._id = '';
        /**
         * Options for geocoding
         * @property service "Nominatim" | "Here"
         * @property key API key
         */
        this.geocodingOptions = {
            service: 'Nominatim',
            key: ''
        };
        /**
         * Options for ip geolocation
         * @property service "ip2location" | "ipinfo"
         * @property key API key
         */
        this.ipGeolocationOptions = {
            service: 'ipinfo',
            key: ''
        };
        this._id = `nodejs-geolocation-${applicationName}-${Math.floor(Math.random() * 100)}`;
    }
    /**
     * Get geolocation from ip address
     * @Important **You must set ipGeolocationOptions object before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     */
    getLocation(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.ipGeolocationOptions)
                throw new Error('You must set ipGeolocationOptions object before using this method');
            if (this.ipGeolocationOptions.service === 'ip2location') {
                const data = yield getGeolocationIP2Location(ip, this.ipGeolocationOptions.key, this._id);
                return {
                    ip: data.ip,
                    city: data.city_name,
                    region: data.region_name,
                    countryCode: data.country_code,
                    timezone: data.time_zone,
                    position: {
                        lat: data.latitude,
                        lon: data.longitude
                    },
                    org: data.as,
                    asn: data.asn,
                    postal: data.zip_code,
                    raw: data
                };
            }
            else if (this.ipGeolocationOptions.service === 'ipinfo') {
                const data = yield getGeolocationIPInfo(ip, this.ipGeolocationOptions.key, this._id);
                return {
                    ip: data.ip,
                    city: data.city,
                    region: data.region,
                    countryCode: data.country,
                    timezone: data.timezone,
                    position: {
                        lat: parseFloat(data.loc.split(',')[0]),
                        lon: parseFloat(data.loc.split(',')[1])
                    },
                    org: data.org.slice(data.org.split('').indexOf(' ') + 1, data.org.length),
                    asn: data.org.slice(0, data.org.split('').indexOf(' ')),
                    postal: data.postal,
                    raw: data
                };
            }
            else {
                throw new Error('Invalid service');
            }
        });
    }
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
                const data = yield geocodeNominatim(address, this._id);
                return {
                    id: data.place_id,
                    address: {
                        city: data.address.city,
                        county: data.address.county,
                        country: data.address.country,
                        state: data.address.state,
                        countryCode: data.address.country_code,
                    },
                    position: {
                        lat: parseFloat(data.lat),
                        lon: parseFloat(data.lon)
                    },
                    displayName: data.display_name,
                    boundingBox: {
                        north: parseFloat(data.boundingbox[1]),
                        south: parseFloat(data.boundingbox[0]),
                        east: parseFloat(data.boundingbox[3]),
                        west: parseFloat(data.boundingbox[2])
                    },
                    raw: data
                };
            }
            else if (this.geocodingOptions.service === 'Here') {
                const data = yield geocodeHere(address, this.geocodingOptions.key, this._id);
                return {
                    id: data.id,
                    address: {
                        city: data.address.city,
                        county: data.address.county,
                        country: data.address.countryName,
                        state: data.address.state,
                        countryCode: data.address.countryCode,
                    },
                    position: {
                        lat: data.position.lat,
                        lon: data.position.lng
                    },
                    displayName: data.title,
                    boundingBox: {
                        north: data.mapView.north,
                        south: data.mapView.south,
                        east: data.mapView.east,
                        west: data.mapView.west
                    },
                    raw: data
                };
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
            else if (this.geocodingOptions.service === 'Here') {
                return yield reverseGeocodeHere(lat, lon, this.geocodingOptions.key, this._id);
            }
            else {
                throw new Error('Invalid service');
            }
        });
    }
    /**
     * Built-in unit converter
     * @param value Value to convert
     * @param from Unit to convert from
     * @param to Unit to convert to
     * @returns Converted value
     */
    convertUnit(value, from, to) {
        const units = {
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
export * from './types.js';
export default NodeGeolocation;
