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
exports.getGeolocation = void 0;
const node_ipinfo_1 = __importDefault(require("node-ipinfo"));
if (!process.env.IPINFO_TOKEN)
    throw new Error("IPINFO_TOKEN env variable is not defined. Please define it in .env file.");
const ipinfo = new node_ipinfo_1.default(process.env.IPINFO_TOKEN);
/**
 * Get geolocation from ip address
 * @param ip Ip address to get geolocation from
 * @returns Geolocation object
 * @example getGeolocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
 */
const getGeolocation = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ipinfo.lookupIp(ip);
});
exports.getGeolocation = getGeolocation;
