import IPinfoWrapper from "node-ipinfo";
import { GeolocationData } from "../types.js";
/**
 * Get geolocation from ip address using ipinfo
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 */
declare const getGeolocationIPInfo: (ip: string, ipinfo: IPinfoWrapper) => Promise<GeolocationData>;
export default getGeolocationIPInfo;
