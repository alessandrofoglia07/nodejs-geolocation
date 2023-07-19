"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function geoOffset(timezone) {
    const match = timezone.match(/([+-])(\d{1,2}):?(\d{2})?/);
    if (!match)
        throw new Error('Invalid timezone');
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2]);
    const minutes = match[3] ? parseInt(match[3]) : 0;
    return sign * (hours + minutes / 60);
}
exports.default = geoOffset;
