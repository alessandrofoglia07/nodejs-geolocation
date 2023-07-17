import { GeolocationData, Position, DistanceCalculationOptions, GeocodingOptions, IPGeolocationOptions, Unit } from './types.js';
/**
 * NodeGeolocation class
 * @constructor (applicationName: string)
 * @docs [Documentation](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/README.md)
 */
declare class NodeGeolocation {
    private _id;
    constructor(applicationName: string);
    /**
     * Options for geocoding
     * @property service "Nominatim" | "Here"
     * @property key API key
     */
    geocodingOptions: GeocodingOptions;
    /**
     * Options for ip geolocation
     * @property service "ip2location" | "ipinfo"
     * @property key API key
     */
    ipGeolocationOptions: IPGeolocationOptions;
    /**
     * Get geolocation from ip address
     * @Important **You must set ipGeolocationOptions object before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     */
    getLocation(ip: string): Promise<GeolocationData | void>;
    /**
     * Calculates the distance between two points on earth using the haversine formula
     * @param pos1 First point
     * @param pos2 Second point
     * @param options Options for the calculation
     * @default options = { unit: 'km', format: false, exact: false }
     * @returns The distance between the two points
     */
    calculateDistance(pos1: Position, pos2: Position, options?: DistanceCalculationOptions): number | string;
    /**
     * Get geocoding data from an address
     * @Important **You must set geocodingOptions object before using this method**
     * @param address Address string to geocode
     * @returns Geocoding data
     */
    getGeocoding(address: string): Promise<any>;
    /**
     * Get reverse geocoding data from a position
     * @Important **You must set geocodingOptions object before using this method**
     * @param pos Position to reverse geocode
     * @returns Reverse geocoding data
     */
    getReverseGeocoding(pos: Position): Promise<any>;
    /**
     * Built-in unit converter
     * @param value Value to convert
     * @param from Unit to convert from
     * @param to Unit to convert to
     * @returns Converted value
     */
    convertUnit(value: number, from: Unit, to: Unit): number;
}
export * from './types.js';
export default NodeGeolocation;
