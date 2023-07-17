import { GeolocationData } from "../types.js";
/**
 * Get geolocation from ip address using ipinfo
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @param appID Application ID
 * @returns Geolocation object
 */
declare const getGeolocationIPInfo: (ip: string, key: string, appID: string) => Promise<GeolocationData>;
export default getGeolocationIPInfo;
