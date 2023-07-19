"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipInfoGeolocation_js_1 = __importDefault(require("./utils/ipInfoGeolocation.cjs"));
const ip2locationGeolocation_js_1 = __importDefault(require("./utils/ip2locationGeolocation.cjs"));
const distanceCalculation_js_1 = __importDefault(require("./utils/distanceCalculation.cjs"));
const geocodeNominatim_js_1 = require("./utils/geocodeNominatim.cjs");
const geocodeHere_js_1 = require("./utils/geocodeHere.cjs");
const geoOffset_js_1 = __importDefault(require("./utils/geoOffset.cjs"));
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
        this.geocodingOptions = undefined;
        /**
         * Options for ip geolocation
         * @property service "ip2location" | "ipinfo"
         * @property key API key
         */
        this.ipGeolocationOptions = undefined;
        this.timezones = new Map([
            ['GMT', 'UTC+0'],
            ['UTC', 'UTC+0'],
            ['EST', 'UTC-5'],
            ['CST', 'UTC-6'],
            ['PST', 'UTC-8'],
            ['ChinaST', 'UTC+8'],
            ['IST', 'UTC+5:30'],
            ['EET', 'UTC+2'],
            ['CET', 'UTC+1'],
            ['AEST', 'UTC+10'],
        ]);
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
                const data = yield (0, ip2locationGeolocation_js_1.default)(ip, this.ipGeolocationOptions.key, this._id);
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
                const data = yield (0, ipInfoGeolocation_js_1.default)(ip, this.ipGeolocationOptions.key, this._id);
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
        return (0, distanceCalculation_js_1.default)(pos1, pos2, options);
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
                const data = yield (0, geocodeNominatim_js_1.geocodeNominatim)(address, this._id);
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
                const data = yield (0, geocodeHere_js_1.geocodeHere)(address, this.geocodingOptions.key, this._id);
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
                return yield (0, geocodeNominatim_js_1.reverseGeocodeNominatim)(lat, lon, this._id);
            }
            else if (this.geocodingOptions.service === 'Here') {
                return yield (0, geocodeHere_js_1.reverseGeocodeHere)(lat, lon, this.geocodingOptions.key, this._id);
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
        return value * units[from] / units[to];
    }
    // fix this (check moment js)
    /**
     * Converts a date from one timezone to another
     * @param date The date to convert
     * @param from The timezone to convert from
     * @param to The timezone to convert to
     */
    timeZoneConvert(date, from, to) {
        if (from === to)
            return date;
        let newFrom = from;
        if (!newFrom.includes('UTC')) {
            newFrom = this.timezones.get(from);
            if (!newFrom)
                throw new Error('Invalid timezone');
        }
        let newTo = to;
        if (!newTo.includes('UTC')) {
            newTo = this.timezones.get(to);
            if (!newTo)
                throw new Error('Invalid timezone');
        }
        const fromOffset = (0, geoOffset_js_1.default)(newFrom);
        const toOffset = (0, geoOffset_js_1.default)(newTo);
        const offset = toOffset - fromOffset;
        const newDate = new Date(date.getTime() + offset * 60 * 60 * 1000);
        return newDate;
    }
}
__exportStar(require("./types.cjs"), exports);
exports.default = NodeGeolocation;
