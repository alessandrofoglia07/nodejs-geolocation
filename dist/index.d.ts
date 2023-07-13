import { GeolocationData, Position, Options } from './types.js';
declare class NodeGeolocation {
    private _key;
    private _ipinfo;
    constructor(key: string);
    set key(key: string);
    get key(): string;
    /**
     * @key **You must set an IpInfo api key before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
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
    calculateDistance(pos1: Position, pos2: Position, options?: Options): number | string;
}
export default NodeGeolocation;
