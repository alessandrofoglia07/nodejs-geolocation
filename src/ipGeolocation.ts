import IPinfoWrapper from "node-ipinfo";
import { GeolocationData } from "./types";

if (!process.env.IPINFO_TOKEN) throw new Error("IPINFO_TOKEN env variable is not defined. Please define it in .env file.");

const ipinfo = new IPinfoWrapper(process.env.IPINFO_TOKEN);

/**
 * Get geolocation from ip address
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 * @example getGeolocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
 */
export const getGeolocation = async (ip: string): Promise<GeolocationData> => {
    return await ipinfo.lookupIp(ip);
};