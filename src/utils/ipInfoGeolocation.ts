import httpsGet from "./httpsGet.js";

/**
 * Get geolocation from ip address using ipinfo
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @param appID Application ID
 * @returns Geolocation object
 */
const getGeolocationIPInfo = async (ip: string, key: string, appID: string): Promise<any> => {
    try {
        const res = await httpsGet(`https://ipinfo.io/${ip}?token=${key}`, appID);
        const data = JSON.parse(res);
        if (data.error) throw new Error(data.error.message);
        return data;
    } catch (err: unknown) {
        if (typeof err === 'string') {
            throw new Error(err);
        } else if (err instanceof Error) {
            throw err;
        } else {
            throw new Error('Unknown error');
        }
    }
};

export default getGeolocationIPInfo;