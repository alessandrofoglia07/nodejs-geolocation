import EventEmitter from 'events';
import calculateDistance from './utils/distanceCalculation.js';
import toFormatPos from './utils/toFormatPosition.js';
/**
 * Geofencing class
 * @constructor (initPosition: Position)
 */
export class Geofencing extends EventEmitter {
    get position() {
        return this._position;
    }
    constructor(initPos) {
        super();
        this.geofences = [];
        this._position = {
            lat: 0,
            lon: 0
        };
        this.posInGeofences = new Map([]);
        if (!initPos)
            return;
        this._position = toFormatPos(initPos);
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
        const { lat, lon } = toFormatPos(pos);
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
        const isInside = this.isInsideGeofence({ lat, lon }, id);
        this.posInGeofences.set(id, isInside);
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
        this.posInGeofences.delete(id);
    }
    /**
     * Clear all geofences
     * @returns void
     */
    clearGeofences() {
        this.geofences = [];
        this.posInGeofences.clear();
    }
    /**
     * Update location and emit enter/exit events
     * @param pos Position to update
     * @returns void
     */
    updateLocation(pos) {
        const { lat, lon } = toFormatPos(pos);
        this._position = { lat, lon };
        this.geofences.forEach(geofence => {
            const distance = calculateDistance({ lat, lon }, { lat: geofence.position.lat, lon: geofence.position.lon });
            if (distance <= geofence.radius && !this.posInGeofences.get(geofence.id)) {
                this.emit('enter', geofence);
                this.posInGeofences.set(geofence.id, true);
            }
            else if (distance > geofence.radius && this.posInGeofences.get(geofence.id)) {
                this.emit('exit', geofence);
                this.posInGeofences.set(geofence.id, false);
            }
        });
    }
    /**
     * Check if a position is inside a geofence
     * @param pos Position to check
     * @param geofenceID Geofence ID to check
     * @returns Whether the position is inside the geofence or not
     */
    isInsideGeofence(pos, geofenceID) {
        const { lat, lon } = toFormatPos(pos);
        const geofence = this.geofences.find(geofence => geofence.id === geofenceID);
        if (!geofence)
            throw new Error('Selected geofence does not exist');
        const distance = calculateDistance({ lat, lon }, { lat: geofence.position.lat, lon: geofence.position.lon });
        return distance <= geofence.radius;
    }
}
