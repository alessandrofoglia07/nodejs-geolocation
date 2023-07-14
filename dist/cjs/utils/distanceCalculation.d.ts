import { Position, DistanceCalculationOptions } from '../types.js';
/**
 * Calculates the distance between two points using the Haversine formula
 * @param pos1 First point
 * @param pos2 Second point
 * @param options Options for the calculation
 * @returns The distance between the two points
 */
declare const calculateDistance: (pos1: Position, pos2: Position, _options?: DistanceCalculationOptions) => string | number;
export default calculateDistance;
