export type IPGeolocationOptions = {
    service: 'ipinfo' | 'ip2location';
    key: string;
} | undefined;
export type GeocodingOptions = {
    service: 'Nominatim' | 'Here';
    key: string;
} | undefined;
export interface GeolocationData {
    ip: string;
    city: string;
    region: string;
    countryCode: string;
    timezone: string;
    position: FormatPosition;
    org: string;
    asn: string;
    postal: string;
    raw: Record<string, any>;
}
export type Timezone = `GMT` | 'UTC' | `UTC${'+' | '-'}${number}` | `UTC${'+' | '-'}${number}:${number}` | 'EST' | 'CST' | 'PST' | 'ChinaST' | 'IST' | 'EET' | 'CET' | 'AEST';
export interface GeocodingData {
    id: string;
    position: FormatPosition;
    address: {
        city: string;
        county: string;
        state: string;
        country: string;
        countryCode: string;
    };
    displayName: string;
    boundingBox: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
    raw: Record<string, any>;
}
export interface ReverseGeocodingData {
    [key: string]: any;
}
export interface FormatPosition {
    lat: number;
    lon: number;
}
export type Position = FormatPosition | {
    latitude: number;
    longitude: number;
} | {
    x: number;
    y: number;
};
export type Unit = 'km' | 'yd' | 'mi' | 'm' | 'ft';
export interface DistanceCalculationOptions {
    unit?: Unit;
    format?: boolean;
    exact?: boolean;
}
export interface Geofence {
    id: string;
    position: FormatPosition;
    radius: number;
    metadata?: Record<string, any>;
}
