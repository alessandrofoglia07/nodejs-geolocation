interface ServiceOptions {
    service: string;
    key: string;
}

export interface IPGeolocationOptions extends ServiceOptions {
    service: 'ipinfo' | 'ip2location';
}

export interface GeocodingOptions extends ServiceOptions {
    service: 'Nominatim' | 'Here';
}

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

interface FormatPosition {
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