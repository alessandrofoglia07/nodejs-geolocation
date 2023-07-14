var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import httpsGet from "./httpsGet.js";
export const geocodeNominatim = (address, applicationID) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;
    try {
        const res = yield httpsGet(apiUrl, applicationID);
        if (res.startsWith('<html>')) {
            throw new Error(res);
        }
        const data = JSON.parse(res);
        if (data.error)
            throw new Error(data.error);
        if (data.length === 0)
            throw new Error('No results found');
        return data[0];
    }
    catch (err) {
        throw new Error(err);
    }
});
export const reverseGeocodeNominatim = (lat, lon, applicationID) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedLat = encodeURIComponent(lat);
    const encodedLon = encodeURIComponent(lon);
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodedLat}&lon=${encodedLon}`;
    try {
        const res = yield httpsGet(apiUrl, applicationID);
        if (res.startsWith('<html>')) {
            throw new Error(res);
        }
        const data = JSON.parse(res);
        if (data.error)
            throw new Error(data.error);
        if (data.length === 0)
            throw new Error('No results found');
        return data;
    }
    catch (err) {
        throw new Error(err);
    }
});
