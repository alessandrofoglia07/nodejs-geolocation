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
export const geocodeHere = (address, apiKey, appID) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodedAddress}&apiKey=${apiKey}`;
    const res = JSON.parse(yield httpsGet(url, appID));
    if (res.items.length === 0) {
        throw new Error('No results found');
    }
    return res.items[0];
});
export const reverseGeocodeHere = (lat, lon, apiKey, appID) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lon}&apiKey=${apiKey}&lang=en-US`;
    const res = JSON.parse(yield httpsGet(url, appID));
    if (res.items.length === 0) {
        throw new Error('No results found');
    }
    return res.items[0];
});