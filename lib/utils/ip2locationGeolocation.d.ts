import { GeolocationData } from "../types.js";
/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @returns Geolocation object
 */
declare const getGeolocationIP2Location: (ip: string, key: string) => Promise<GeolocationData>;
export default getGeolocationIP2Location;
