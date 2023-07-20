"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geofencing = void 0;
const events_1 = __importDefault(require("events"));
const distanceCalculation_js_1 = __importDefault(require("./utils/distanceCalculation.cjs"));
/**
 * Geofencing class
 * @constructor ()
 */
class Geofencing extends events_1.default {
    constructor() {
        super();
        this.geofences = [];
    }
    /**
     * Add a geofence
     * @param id Geofence ID
     * @param pos Geofence position
     * @param radius Geofence radius
     * @param metadata Geofence metadata
     * @returns void
     */
    addGeofence(id, pos, radius, metadata = {}) {
        let lat;
        let lon;
        if ('lat' in pos && 'lon' in pos) {
            lat = pos.lat;
            lon = pos.lon;
        }
        else if ('latitude' in pos && 'longitude' in pos) {
            lat = pos.latitude;
            lon = pos.longitude;
        }
        else if ('x' in pos && 'y' in pos) {
            lat = pos.x;
            lon = pos.y;
        }
        else {
            throw new Error('Invalid position');
        }
        if (this.geofences.some(geofence => geofence.id === id))
            throw new Error('Geofence already exists');
        this.geofences.push({
            id,
            position: {
                lat,
                lon
            },
            radius,
            metadata
        });
    }
    /**
     * Get all geofences
     * @returns Saved geofences
     */
    getGeofences() {
        return this.geofences;
    }
    /**
     * Remove a geofence
     * @param id Geofence ID
     * @returns void
     */
    removeGeofence(id) {
        const geofence = this.geofences.find(geofence => geofence.id === id);
        if (!geofence)
            throw new Error('Geofence does not exist');
        this.geofences = this.geofences.filter(geofence => geofence.id !== id);
    }
    /**
     * Clear all geofences
     * @returns void
     */
    clearGeofences() {
        this.geofences = [];
    }
    /**
     * Update location and emit enter/exit events
     * @param pos Position to update
     * @returns void
     */
    updateLocation(pos) {
        let lat;
        let lon;
        if ('lat' in pos && 'lon' in pos) {
            lat = pos.lat;
            lon = pos.lon;
        }
        else if ('latitude' in pos && 'longitude' in pos) {
            lat = pos.latitude;
            lon = pos.longitude;
        }
        else if ('x' in pos && 'y' in pos) {
            lat = pos.x;
            lon = pos.y;
        }
        else {
            throw new Error('Invalid position');
        }
        this.geofences.forEach(geofence => {
            const distance = (0, distanceCalculation_js_1.default)({ lat, lon }, { lat: geofence.position.lat, lon: geofence.position.lon });
            if (distance <= geofence.radius) {
                this.emit('enter', geofence);
            }
            else {
                this.emit('exit', geofence);
            }
        });
    }
    isInsideGeofence(pos, geofenceID) {
        let lat;
        let lon;
        if ('lat' in pos && 'lon' in pos) {
            lat = pos.lat;
            lon = pos.lon;
        }
        else if ('latitude' in pos && 'longitude' in pos) {
            lat = pos.latitude;
            lon = pos.longitude;
        }
        else if ('x' in pos && 'y' in pos) {
            lat = pos.x;
            lon = pos.y;
        }
        else {
            throw new Error('Invalid position');
        }
        const geofence = this.geofences.find(geofence => geofence.id === geofenceID);
        if (!geofence)
            throw new Error('Selected geofence does not exist');
        const distance = (0, distanceCalculation_js_1.default)({ lat, lon }, { lat: geofence.position.lat, lon: geofence.position.lon });
        return distance <= geofence.radius;
    }
}
exports.Geofencing = Geofencing;
