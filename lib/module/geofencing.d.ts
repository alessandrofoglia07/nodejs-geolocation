/// <reference types="node" />
import EventEmitter from 'events';
import { Geofence, Position } from './types.js';
/**
 * Geofencing class
 * @constructor ()
 */
export declare class Geofencing extends EventEmitter {
    private geofences;
    constructor();
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
    isInsideGeofence(pos: Position, geofenceID: string): boolean;
}
