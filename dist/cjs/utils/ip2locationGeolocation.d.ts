import { GeolocationData } from "../types.js";
/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 * @example getGeolocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
 */
declare const getGeolocationIP2Location: (ip: string, key: string) => Promise<GeolocationData>;
export default getGeolocationIP2Location;
