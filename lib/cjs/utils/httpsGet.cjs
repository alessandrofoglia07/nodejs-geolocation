"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
/**
 * Get data from api (https)
 * @param url Url to get data from
 * @param applicationID Application ID
 * @returns Data from url
 */
const httpsGet = (url, applicationID) => {
    const options = {
        headers: {
            'User-Agent': applicationID
        }
    };
    return new Promise((resolve, reject) => {
        https_1.default.get(url, options, (response) => {
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
};
exports.default = httpsGet;
