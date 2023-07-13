var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import https from 'https';
function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}
/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 * @example getGeolocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
 */
const getGeolocationIP2Location = (ip, key) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.ip2location.io/?key=${key}&ip=${ip}&format=json`;
    try {
        const data = JSON.parse(yield httpsGet(url));
        if (data.error)
            throw new Error(data.error);
        return data;
    }
    catch (err) {
        throw err;
    }
});
export default getGeolocationIP2Location;
