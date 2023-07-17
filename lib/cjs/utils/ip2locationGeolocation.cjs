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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpsGet_js_1 = __importDefault(require("./httpsGet.cjs"));
/**
 * Get geolocation from ip address using ip2location
 * @param ip Ip address to get geolocation from
 * @param key API key
 * @param appID Application ID
 * @returns Geolocation object
 */
const getGeolocationIP2Location = (ip, key, appID) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.ip2location.io/?key=${key}&ip=${ip}&format=json`;
    const data = JSON.parse(yield (0, httpsGet_js_1.default)(url, appID));
    if (data.error)
        throw new Error(data.error);
    return data;
});
exports.default = getGeolocationIP2Location;
