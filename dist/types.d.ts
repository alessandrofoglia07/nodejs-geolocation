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
