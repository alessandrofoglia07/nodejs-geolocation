/**
 * Geocode address using Here API
 * @param address Address to geocode
 * @param apiKey API key
 * @param appID Application ID
 * @returns Geocoded address
 */
export declare const geocodeHere: (address: string, apiKey: string, appID: string, queryParameters?: Record<string, string>) => Promise<any>;
/**
 * Reverse geocode address using Here API
 * @param lat Latitude
 * @param lon Longitude
 * @param apiKey API key
 * @param appID Application ID
 * @returns Reverse geocoded address
 */
export declare const reverseGeocodeHere: (lat: number, lon: number, apiKey: string, appID: string, queryParameters?: Record<string, string>) => Promise<any>;
