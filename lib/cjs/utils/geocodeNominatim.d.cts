/**
 * Geocode address using Nominatim
 * @param address Address to geocode
 * @param appID Application ID
 * @returns Geocoded address
 */
export declare const geocodeNominatim: (address: string, appID: string) => Promise<any>;
/**
 * Reverse geocode address using Nominatim
 * @param lat Latitude
 * @param lon Longitude
 * @param appID Application ID
 * @returns Reverse geocoded address
 */
export declare const reverseGeocodeNominatim: (lat: number | string, lon: number | string, appID: string) => Promise<any>;
