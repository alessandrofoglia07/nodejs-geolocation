import { Position, Options } from '../types.js';

/**
 * Calculates the distance between two points using the Haversine formula
 * @param pos1 First point
 * @param pos2 Second point
 * @param options Options for the calculation
 * @returns The distance between the two points
 */
const calculateDistance = (pos1: Position, pos2: Position, _options: Options = { unit: 'km', format: false, exact: false }) => {
    let lat1: number;
    let lon1: number;
    let lat2: number;
    let lon2: number;

    const options = {
        unit: _options.unit || 'km',
        format: _options.format || false,
        exact: _options.exact || false
    };

    if ('lat' in pos1 && 'lon' in pos1) {
        lat1 = pos1.lat;
        lon1 = pos1.lon;
    } else if ('latitude' in pos1 && 'longitude' in pos1) {
        lat1 = pos1.latitude;
        lon1 = pos1.longitude;
    } else {
        lat1 = pos1.x;
        lon1 = pos1.y;
    }

    if ('lat' in pos2 && 'lon' in pos2) {
        lat2 = pos2.lat;
        lon2 = pos2.lon;
    } else if ('latitude' in pos2 && 'longitude' in pos2) {
        lat2 = pos2.latitude;
        lon2 = pos2.longitude;
    } else {
        lat2 = pos2.x;
        lon2 = pos2.y;
    }

    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let dist = 6371 * c;

    let mesurement: string;

    switch (options.unit) {
        case 'km': mesurement = 'kilometers'; break;
        case 'yd': mesurement = 'yards'; dist *= 1093.6133; break;
        case 'ft': mesurement = 'feet'; dist *= 3280.8399; break;
        case 'mi': mesurement = 'miles'; dist *= 0.621371192; break;
        case 'm': mesurement = 'meters'; dist *= 1000; break;
        default: throw new Error('Invalid unit');
    }

    if (!options.exact) dist = Math.round(dist);

    if (options.format) return `${dist} ${mesurement!}`;

    return dist;
};

export default calculateDistance;