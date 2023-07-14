require('dotenv').config();
import NodeGeolocation from '../lib/cjs/index.js';

const { IPINFO_KEY, TESTIP, IP2LOCATION_KEY } = process.env;

if (!IPINFO_KEY || !TESTIP || !IP2LOCATION_KEY) {
    throw new Error('Please define IPINFO_KEY, TESTIP and IP2LOCATION_KEY in .env file to run tests');
}

test('NodeGeolocation should be defined', () => {
    expect(NodeGeolocation).toBeDefined();
    expect(new NodeGeolocation()).toBeDefined();
});

describe('NodeGeolocation should return geolocation data correctly using IPInfo', () => {
    it('Should return geolocation data', async () => {
        const geo = new NodeGeolocation();
        geo.ipGeolocationOptions = {
            service: 'ipinfo',
            key: IPINFO_KEY
        };
        const data = await geo.getLocation(TESTIP);
        expect(data).toBeDefined();
        if (data) {
            expect(data.ip).toBe(TESTIP);
        }
    });

    it('Should throw error if api key is not valid', async () => {
        const geo = new NodeGeolocation();
        geo.ipGeolocationOptions = {
            service: 'ipinfo',
            key: 'invalid'
        };
        await expect(geo.getLocation(TESTIP)).rejects.toThrow();
    });
});

describe('NodeGeolocation should return geolocation data correctly using IP2Location', () => {
    it('Should return geolocation data', async () => {
        const geo = new NodeGeolocation();
        geo.ipGeolocationOptions = {
            service: 'ip2location',
            key: IP2LOCATION_KEY
        };
        const data = await geo.getLocation(TESTIP);
        expect(data).toBeDefined();
        if (data) {
            expect(data.ip).toBe(TESTIP);
        }
    });

    it('Should throw error if api key is not valid', async () => {
        const geo = new NodeGeolocation();
        geo.ipGeolocationOptions = {
            service: 'ip2location',
            key: 'invalid'
        };
        await expect(geo.getLocation(TESTIP)).rejects.toThrow();
    });
});

describe('NodeGeolocation should calculate distance correctly', () => {

    const geo = new NodeGeolocation();
    // Rome, Italy
    const pos1 = { lat: 41.902782, lon: 12.496366 };
    // Tokyo, Japan
    const pos2 = { latitude: 35.685013, longitude: 139.7514 };

    it('Should calculate distance between two points', () => {
        const distance = geo.calculateDistance(pos1, pos2);
        expect(distance).toBeDefined();
        expect(distance).toBe(9857);
    });

    it('Should calculate distance between two points in miles', () => {
        const distance = geo.calculateDistance(pos1, pos2, { unit: 'mi' });
        expect(distance).toBeDefined();
        expect(distance).toBe(6125);
    });

    it('Should return formatted distance between two points', () => {
        const distance = geo.calculateDistance(pos1, pos2, { format: true });
        expect(distance).toBeDefined();
        expect(distance).toBe('9857 kilometers');
    });

    it('Should calculate exact distance between two points in miles', () => {
        const distance = geo.calculateDistance(pos1, pos2, { unit: 'mi', exact: true });
        expect(distance).toBeDefined();
        expect(distance).toBe(6124.860370167203);
    });
});

describe('NodeGeolocation should return geocoding data correctly using Nominatim', () => {
    it('Should return geocoding data', async () => {
        const geo = new NodeGeolocation();
        geo.geocodingOptions = {
            service: 'Nominatim',
            key: ''
        };

        const data = await geo.getGeocoding('Rome, Italy');
        console.log(data);

        expect(data).toBeDefined();
        if (data) {
            expect(data.lat).toBe(41.8933203);
            expect(data.lon).toBe(12.4829321);
        }
    });

    it('Should throw error if location is not valid', async () => {
        const geo = new NodeGeolocation();
        geo.geocodingOptions = {
            service: 'Nominatim',
            key: ''
        };

        await expect(geo.getGeocoding('jdsjndijab')).rejects.toThrow();
    });
});