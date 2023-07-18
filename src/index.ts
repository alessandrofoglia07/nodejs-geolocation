import getGeolocationIPInfo from './utils/ipInfoGeolocation.js';
import getGeolocationIP2Location from './utils/ip2locationGeolocation.js';
import { GeolocationData, Position, DistanceCalculationOptions, GeocodingOptions, IPGeolocationOptions, Unit, GeocodingData, ReverseGeocodingData } from './types.js';
import calculateDistance from './utils/distanceCalculation.js';
import { geocodeNominatim, reverseGeocodeNominatim } from './utils/geocodeNominatim.js';
import { geocodeHere, reverseGeocodeHere } from './utils/geocodeHere.js';

/**
 * NodeGeolocation class
 * @constructor (applicationName: string)
 * @docs [Documentation](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/README.md)
 */
class NodeGeolocation {

    private _id: string = '';

    constructor(applicationName: string) {
        this._id = `nodejs-geolocation-${applicationName}-${Math.floor(Math.random() * 100)}`;
    }

    /**
     * Options for geocoding
     * @property service "Nominatim" | "Here"
     * @property key API key
     */
    public geocodingOptions: GeocodingOptions = undefined;

    /**
     * Options for ip geolocation
     * @property service "ip2location" | "ipinfo"
     * @property key API key
     */
    public ipGeolocationOptions: IPGeolocationOptions = undefined;

    /**
     * Get geolocation from ip address
     * @Important **You must set ipGeolocationOptions object before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     */
    public async getLocation(ip: string): Promise<GeolocationData> {
        if (!this.ipGeolocationOptions) throw new Error('You must set ipGeolocationOptions object before using this method');
        if (this.ipGeolocationOptions.service === 'ip2location') {
            const data = await getGeolocationIP2Location(ip, this.ipGeolocationOptions.key, this._id);
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
        } else if (this.ipGeolocationOptions.service === 'ipinfo') {
            const data = await getGeolocationIPInfo(ip, this.ipGeolocationOptions.key, this._id);
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
                org: (data.org as string).slice((data.org as string).split('').indexOf(' ') + 1, data.org.length),
                asn: (data.org as string).slice(0, (data.org as string).split('').indexOf(' ')),
                postal: data.postal,
                raw: data
            };
        } else {
            throw new Error('Invalid service');
        }
    }

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
    public async getGeocoding(address: string): Promise<GeocodingData> {
        if (!this.geocodingOptions) throw new Error('You must set geocodingOptions object before using this method');
        if (this.geocodingOptions.service === 'Nominatim') {
            const data = await geocodeNominatim(address, this._id);
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
        } else if (this.geocodingOptions.service === 'Here') {
            const data = await geocodeHere(address, this.geocodingOptions.key, this._id);
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
    public async getReverseGeocoding(pos: Position): Promise<ReverseGeocodingData> {
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
        } else if (this.geocodingOptions.service === 'Here') {
            return await reverseGeocodeHere(lat, lon, this.geocodingOptions.key, this._id);
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

export * from './types.js';
export default NodeGeolocation;