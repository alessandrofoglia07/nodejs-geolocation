import IPinfoWrapper from "node-ipinfo";
import { GeolocationData } from "../types.js";

/**
 * Get geolocation from ip address using ipinfo
 * @param ip Ip address to get geolocation from
 * @param ipinfo IPinfoWrapper object
 * @returns Geolocation object
 */
const getGeolocationIPInfo = async (ip: string, ipinfo: IPinfoWrapper): Promise<GeolocationData> => {
    try {
        return await ipinfo.lookupIp(ip);
    } catch (err: any) {
        throw new Error(err);
    }
};

export default getGeolocationIPInfo;