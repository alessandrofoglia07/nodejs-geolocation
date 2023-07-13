export interface GeolocationData {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
    countryCode: string;
    countryFlag: {
        emoji: string;
        unicode: string;
    };
    countryCurrency: {
        code: string;
        symbol: string;
    };
    continent: {
        code: string;
        name: string;
    };
    isEU: boolean;
}
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
    unit: 'km' | 'yd' | 'mi' | 'm' | 'ft';
    format: boolean;
    exact: boolean;
}
