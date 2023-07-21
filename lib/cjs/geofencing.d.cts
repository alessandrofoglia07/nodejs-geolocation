/// <reference types="node" />
import EventEmitter from 'events';
import { Geofence, Position, FormatPosition } from './types.cjs';
/**
 * Geofencing class
 * @constructor (initPosition: Position)
 */
export declare class Geofencing extends EventEmitter {
    private geofences;
    private _position;
    private posInGeofences;
    get position(): FormatPosition;
    constructor(initPos?: Position);
    /**
     * Add a geofence
     * @param id Geofence ID
     * @param pos Geofence position
     * @param radius Geofence radius
     * @param metadata Geofence metadata
     * @returns void
     */
    addGeofence(id: string, pos: Position, radius: number, metadata?: Record<string, any>): void;
    /**
     * Get all geofences
     * @returns Saved geofences
     */
    getGeofences(): Geofence[];
    /**
     * Remove a geofence
     * @param id Geofence ID
     * @returns void
     */
    removeGeofence(id: string): void;
    /**
     * Clear all geofences
     * @returns void
     */
    clearGeofences(): void;
    /**
     * Update location and emit enter/exit events
     * @param pos Position to update
     * @returns void
     */
    updateLocation(pos: Position): void;
    /**
     * Check if a position is inside a geofence
     * @param pos Position to check
     * @param geofenceID Geofence ID to check
     * @returns Whether the position is inside the geofence or not
     */
    isInsideGeofence(pos: Position, geofenceID: string): boolean;
}
