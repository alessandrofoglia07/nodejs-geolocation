import httpsGet from "./httpsGet.js";

/**
 * Geocode address using Here API
 * @param address Address to geocode
 * @param apiKey API key
 * @param appID Application ID
 * @returns Geocoded address
 */
export const geocodeHere = async (address: string, apiKey: string, appID: string, queryParameters?: Record<string, string>): Promise<any> => {
    const encodedAddress = encodeURIComponent(address);
    const url = new URL(`https://geocode.search.hereapi.com/v1/geocode?q=${encodedAddress}&apiKey=${apiKey}`);

    if (queryParameters) {
        for (const key in queryParameters) {
            url.searchParams.append(key, queryParameters[key]);
        }
    }

    const res = JSON.parse(await httpsGet(url.toString(), appID));

    if (res.items.length === 0) {
        throw new Error('No results found');
    }

    return res.items[0];
};

/**
 * Reverse geocode address using Here API
 * @param lat Latitude
 * @param lon Longitude
 * @param apiKey API key
 * @param appID Application ID
 * @returns Reverse geocoded address
 */
export const reverseGeocodeHere = async (lat: number, lon: number, apiKey: string, appID: string, queryParameters?: Record<string, string>): Promise<any> => {
    const url = new URL(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lon}&apiKey=${apiKey}`);

    if (queryParameters) {
        for (const key in queryParameters) {
            url.searchParams.append(key, queryParameters[key]);
        }
    }

    const res = JSON.parse(await httpsGet(url.toString(), appID));

    if (res.items.length === 0) {
        throw new Error('No results found');
    }

    return res.items[0];
};