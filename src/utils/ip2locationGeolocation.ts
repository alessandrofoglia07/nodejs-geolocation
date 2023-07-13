import { GeolocationData } from "../types.js";
import https from 'https';

function httpsGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (err: any) => {
            reject(err);
        });
    });
}

/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @returns Geolocation object
 */
const getGeolocationIP2Location = async (ip: string, key: string): Promise<GeolocationData> => {
    const url = `https://api.ip2location.io/?key=${key}&ip=${ip}&format=json`;
    try {
        const data = JSON.parse(await httpsGet(url));
        if (data.error) throw new Error(data.error);
        return data;
    } catch (err: any) {
        throw err;
    }
};

export default getGeolocationIP2Location;