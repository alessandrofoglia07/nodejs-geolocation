require('dotenv').config();
import NodeGeolocation from '../lib/cjs/index.cjs';

const { IPINFO_KEY, TESTIP, IP2LOCATION_KEY } = process.env;

if (!IPINFO_KEY || !TESTIP || !IP2LOCATION_KEY) {
    throw new Error('Please define IPINFO_KEY, TESTIP and IP2LOCATION_KEY in .env file to run tests');
}

test('NodeGeolocation should be defined', () => {
    expect(NodeGeolocation).toBeDefined();
    expect(new NodeGeolocation('test')).toBeDefined();
});

describe('NodeGeolocation should return geolocation data correctly using IPInfo', () => {

    const geo = new NodeGeolocation('test');

    it('Should return geolocation data', async () => {
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
        geo.ipGeolocationOptions = {
            service: 'ipinfo',
            key: 'invalid'
        };
        await expect(geo.getLocation(TESTIP)).rejects.toThrow();
    });
});

describe('NodeGeolocation should return geolocation data correctly using IP2Location', () => {

    const geo = new NodeGeolocation('test');

    it('Should return geolocation data', async () => {
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
        geo.ipGeolocationOptions = {
            service: 'ip2location',
            key: 'invalid'
        };
        await expect(geo.getLocation(TESTIP)).rejects.toThrow();
    });
});

describe('NodeGeolocation should calculate distance correctly', () => {

    const geo = new NodeGeolocation('test');
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

    const geo = new NodeGeolocation('test');
    geo.geocodingOptions = {
        service: 'Nominatim',
        key: ''
    };

    it('Should return geocoding data', async () => {
        const data = await geo.getGeocoding('Rome, Italy');
        expect(data).toBeDefined();
        expect(data.lat).toBe("41.8933203");
        expect(data.lon).toBe("12.4829321");
    });

    it('Should throw error if location is not valid', async () => {
        await expect(geo.getGeocoding('i.n.v.a.l.i.d')).rejects.toThrow();
    });

    it('Should return reverse geocoding data', async () => {
        const data = await geo.getReverseGeocoding({ lat: 41.8933203, lon: 12.4829321 });
        expect(data).toBeDefined();
        expect(data.address.city).toBe("Roma");
        expect(data.address.country).toBe("Italia");
    });
});

describe('NodeGeolocation should convert units correctly', () => {

    const geo = new NodeGeolocation('test');

    it('Should convert kilometers to meters', () => {
        const distance = geo.convertUnit(3, 'km', 'm');
        expect(distance).toBe(3000);
    });

    it('Should convert kilometers to miles', () => {
        const distance = geo.convertUnit(2, 'km', 'mi');
        expect(distance).toBe(1.2427454732996135);
    });

    it('Should convert miles to kilometers', () => {
        const distance = geo.convertUnit(1, 'mi', 'km');
        expect(distance).toBe(1.60934);
    });

    it('Should convert yards to feet', () => {
        const distance = geo.convertUnit(1, 'yd', 'ft');
        expect(distance).toBe(3);
    });
});