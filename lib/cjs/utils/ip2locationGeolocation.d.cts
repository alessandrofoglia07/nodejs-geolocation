import { GeolocationData } from "../types.cjs";
/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @param appID Application ID
 * @returns Geolocation object
 */
declare const getGeolocationIP2Location: (ip: string, key: string, appID: string) => Promise<GeolocationData>;
export default getGeolocationIP2Location;
