"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get geolocation from ip address using ipinfo
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 */
const getGeolocationIPInfo = (ip, ipinfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ipinfo.lookupIp(ip);
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.default = getGeolocationIPInfo;
