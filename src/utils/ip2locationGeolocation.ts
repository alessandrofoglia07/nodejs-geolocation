import { GeolocationData } from "../types.js";
import httpsGet from "./httpsGet.js";

/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @param appID Application ID
 * @returns Geolocation object
 */
const getGeolocationIP2Location = async (ip: string, key: string, appID: string): Promise<GeolocationData> => {
    const url = `https://api.ip2location.io/?key=${key}&ip=${ip}&format=json`;
    try {
        const data = JSON.parse(await httpsGet(url, appID));
        if (data.error) throw new Error(data.error);
        return data;
    } catch (err: any) {
        throw err;
    }
};

export default getGeolocationIP2Location;