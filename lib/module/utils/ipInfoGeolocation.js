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
 * Get geolocation from ip address using ipinfo
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @param appID Application ID
 * @returns Geolocation object
 */
const getGeolocationIPInfo = (ip, key, appID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield httpsGet(`https://ipinfo.io/${ip}?token=${key}`, appID);
        const data = JSON.parse(res);
        if (data.error)
            throw new Error(data.error.message);
        return data;
    }
    catch (err) {
        if (typeof err === 'string') {
            throw new Error(err);
        }
        else if (err instanceof Error) {
            throw err;
        }
        else {
            throw new Error('Unknown error');
        }
    }
});
export default getGeolocationIPInfo;
