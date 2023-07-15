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
/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @returns Geolocation object
 */
const getGeolocationIP2Location = (ip, key, applicationID) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.ip2location.io/?key=${key}&ip=${ip}&format=json`;
    try {
        const data = JSON.parse(yield httpsGet(url, applicationID));
        if (data.error)
            throw new Error(data.error);
        return data;
    }
    catch (err) {
        throw err;
    }
});
export default getGeolocationIP2Location;
