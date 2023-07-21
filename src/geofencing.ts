import EventEmitter from 'events';
import { Geofence, Position, FormatPosition } from './types.js';
import calculateDistance from './utils/distanceCalculation.js';
import toFormatPos from './utils/toFormatPosition.js';

/**
 * Geofencing class
 * @constructor (initPosition: Position)
 */
export class Geofencing extends EventEmitter {

    private geofences: Geofence[] = [];
    private _position: FormatPosition = {
        lat: 0,
        lon: 0
    };
    private posInGeofences = new Map<string, boolean>([]);

    public get position(): FormatPosition {
        return this._position;
    }

    constructor(initPos?: Position) {
        super();

        if (!initPos) return;

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
    public addGeofence(id: string, pos: Position, radius: number, metadata: Record<string, any> = {}) {
        const { lat, lon } = toFormatPos(pos);

        if (this.geofences.some(geofence => geofence.id === id)) throw new Error('Geofence already exists');

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
    public getGeofences(): Geofence[] {
        return this.geofences;
    }

    /**
     * Remove a geofence
     * @param id Geofence ID
     * @returns void
     */
    public removeGeofence(id: string) {
        const geofence = this.geofences.find(geofence => geofence.id === id);

        if (!geofence) throw new Error('Geofence does not exist');

        this.geofences = this.geofences.filter(geofence => geofence.id !== id);

        this.posInGeofences.delete(id);
    }

    /**
     * Clear all geofences
     * @returns void
     */
    public clearGeofences() {
        this.geofences = [];
        this.posInGeofences.clear();
    }

    /**
     * Update location and emit enter/exit events
     * @param pos Position to update
     * @returns void
     */
    public updateLocation(pos: Position) {
        const { lat, lon } = toFormatPos(pos);

        this._position = { lat, lon };

        this.geofences.forEach(geofence => {
            const distance = calculateDistance({ lat, lon }, { lat: geofence.position.lat, lon: geofence.position.lon }) as number;

            if (distance <= geofence.radius && !this.posInGeofences.get(geofence.id)) {
                this.emit('enter', geofence);
                this.posInGeofences.set(geofence.id, true);
            } else if (distance > geofence.radius && this.posInGeofences.get(geofence.id)) {
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
    public isInsideGeofence(pos: Position, geofenceID: string) {
        const { lat, lon } = toFormatPos(pos);

        const geofence = this.geofences.find(geofence => geofence.id === geofenceID);

        if (!geofence) throw new Error('Selected geofence does not exist');

        const distance = calculateDistance({ lat, lon }, { lat: geofence.position.lat, lon: geofence.position.lon }) as number;

        return distance <= geofence.radius;
    }
}