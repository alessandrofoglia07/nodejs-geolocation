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
const ipGeolocation_js_1 = require("./utils/ipGeolocation.js");
const node_ipinfo_1 = __importDefault(require("node-ipinfo"));
const distanceCalculation_js_1 = __importDefault(require("./utils/distanceCalculation.js"));
class NodeGeolocation {
    constructor(key) {
        this._key = '';
        this._ipinfo = new node_ipinfo_1.default('');
        this._key = key;
        this._ipinfo = new node_ipinfo_1.default(this._key);
    }
    set key(key) {
        this._key = key;
        this._ipinfo = new node_ipinfo_1.default(this._key);
    }
    get key() {
        return this._key;
    }
    /**
     * @key **You must set an IpInfo api key before using this method**
     * @description Get geolocation from ip address
     * @param ip IP address to get geolocation from
     * @returns Geolocation object
     * @example NodeGeolocation.getLocation("111.6.105.201") // { ip: "111.6.105.201", hostname: "...", ...}
     */
    getLocation(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, ipGeolocation_js_1.getGeolocation)(ip, this._ipinfo);
        });
    }
    ;
    /**
     * Calculates the distance between two points on earth using the haversine formula
     * @param pos1 First point
     * @param pos2 Second point
     * @param options Options for the calculation
     * @default options = { unit: 'km', format: false, exact: false }
     * @returns The distance between the two points
     */
    calculateDistance(pos1, pos2, options) {
        return (0, distanceCalculation_js_1.default)(pos1, pos2, options);
    }
}
exports.default = NodeGeolocation;
