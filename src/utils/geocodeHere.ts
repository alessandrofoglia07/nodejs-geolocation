import httpsGet from "./httpsGet.js";

export const geocodeHere = async (address: string, apiKey: string, appID: string): Promise<any> => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodedAddress}&apiKey=${apiKey}`;

    const res = JSON.parse(await httpsGet(url, appID));

    if (res.items.length === 0) {
        throw new Error('No results found');
    }

    return res.items[0];
};

export const reverseGeocodeHere = async (lat: number, lon: number, apiKey: string, appID: string): Promise<any> => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lon}&apiKey=${apiKey}&lang=en-US`;

    const res = JSON.parse(await httpsGet(url, appID));

    if (res.items.length === 0) {
        throw new Error('No results found');
    }

    return res.items[0];
};