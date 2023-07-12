"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeolocation = void 0;
require('dotenv').config();
var ipGeolocation_1 = require("./ipGeolocation");
Object.defineProperty(exports, "getGeolocation", { enumerable: true, get: function () { return ipGeolocation_1.getGeolocation; } });
