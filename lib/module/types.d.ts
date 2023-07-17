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
export type GeolocationData = {
    ip: string;
    [key: string]: any;
};
export type Position = {
    lat: number;
    lon: number;
} | {
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
export {};
