import IPinfoWrapper from "node-ipinfo";
import { GeolocationData } from "../types.js";
/**
 * Get geolocation from ip address
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 * @example getGeolocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
 */
export declare const getGeolocation: (ip: string, ipinfo: IPinfoWrapper) => Promise<GeolocationData>;
