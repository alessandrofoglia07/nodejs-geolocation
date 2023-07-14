import httpsGet from "./httpsGet.js";

const geocodeNominatim = async (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    let apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;

    try {
        const res = await httpsGet(apiUrl);

        if (res.startsWith('<html>')) {
            throw new Error(res);
        }

        const data = JSON.parse(res);

        if (data.error) throw new Error(data.error);
        if (data.length === 0) throw new Error('No results found');

        const { lat, lon } = data[0];

        return {
            lat: parseFloat(lat),
            lon: parseFloat(lon)
        };

    } catch (err: any) {
        throw new Error(err);
    }
};

export default geocodeNominatim;