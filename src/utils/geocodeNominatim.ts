import httpsGet from "./httpsGet.js";

export const geocodeNominatim = async (address: string, applicationID: string) => {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;

    try {
        const res = await httpsGet(apiUrl, applicationID);

        if (res.startsWith('<html>')) {
            throw new Error(res);
        }

        const data = JSON.parse(res);

        if (data.error) throw new Error(data.error);
        if (data.length === 0) throw new Error('No results found');

        return data[0];

    } catch (err: any) {
        throw new Error(err);
    }
};

export const reverseGeocodeNominatim = async (lat: number | string, lon: number | string, applicationID: string) => {
    const encodedLat = encodeURIComponent(lat);
    const encodedLon = encodeURIComponent(lon);

    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodedLat}&lon=${encodedLon}`;

    try {
        const res = await httpsGet(apiUrl, applicationID);

        if (res.startsWith('<html>')) {
            throw new Error(res);
        }

        const data = JSON.parse(res);

        if (data.error) throw new Error(data.error);
        if (data.length === 0) throw new Error('No results found');

        return data;
    } catch (err: any) {
        throw new Error(err);
    }
};