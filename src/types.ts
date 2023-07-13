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

export interface Options {
    unit?: 'km' | 'yd' | 'mi' | 'm' | 'ft';
    format?: boolean;
    exact?: boolean;
}