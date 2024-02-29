import httpsGet from "./httpsGet.js";

/**
 * Geocode address using Nominatim
 * @param address Address to geocode
 * @param appID Application ID
 * @param queryParameters Query parameters
 * @returns Geocoded address 
 */
export const geocodeNominatim = async (address: string, appID: string, queryParameters?: Record<string, string>): Promise<any> => {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = new URL(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`);

    if (queryParameters) {
        for (const key in queryParameters) {
            apiUrl.searchParams.append(key, queryParameters[key]);
        }
    }

    try {
        const res = await httpsGet(apiUrl.toString(), appID);

        if (res.startsWith('<html>')) {
            throw new Error(res);
        }

        const data = JSON.parse(res);

        if (data.error) throw new Error(data.error);
        if (data.length === 0) throw new Error('No results found');

        return data[0];

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

/**
 * Reverse geocode address using Nominatim
 * @param lat Latitude
 * @param lon Longitude
 * @param appID Application ID
 * @param queryParameters Query parameters
 * @returns Reverse geocoded address
 */
export const reverseGeocodeNominatim = async (lat: number | string, lon: number | string, appID: string, queryParameters?: Record<string, string>): Promise<any> => {
    const encodedLat = encodeURIComponent(lat);
    const encodedLon = encodeURIComponent(lon);

    const apiUrl = new URL(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodedLat}&lon=${encodedLon}`);

    if (queryParameters) {
        for (const key in queryParameters) {
            apiUrl.searchParams.append(key, queryParameters[key]);
        }
    }

    try {
        const res = await httpsGet(apiUrl.toString(), appID);

        if (res.startsWith('<html>')) {
            throw new Error(res);
        }

        const data = JSON.parse(res);

        if (data.error) throw new Error(data.error);
        if (data.length === 0) throw new Error('No results found');

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