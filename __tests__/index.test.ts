require('dotenv').config();
const NodeGeolocation = require('../src/index');

const { IPINFO_TOKEN, IPINFO_TESTIP } = process.env;

test('NodeGeolocation should be defined', () => {
    expect(NodeGeolocation).toBeDefined();
    expect(new NodeGeolocation('')).toBeDefined();
});

describe('NodeGeolocation should return geolocation data correctly', () => {
    it('Should return geolocation data', async () => {
        const geo = new NodeGeolocation(IPINFO_TOKEN);
        const data = await geo.getLocation(IPINFO_TESTIP);
        expect(data).toBeDefined();
        expect(data.ip).toBe(IPINFO_TESTIP);
    });

    it('Should change api key with setter', async () => {
        const geo = new NodeGeolocation();
        geo.key = IPINFO_TOKEN;
        const data = await geo.getLocation(IPINFO_TESTIP);
        expect(data).toBeDefined();
        expect(data.ip).toBe(IPINFO_TESTIP);
    });

    it('Should throw error if api key is not valid', async () => {
        const geo = new NodeGeolocation('invalid');
        await expect(geo.getLocation(IPINFO_TESTIP)).rejects.toThrow();
    });
});

describe('NodeGeolocation should calculate distance correctly', () => {

    const geo = new NodeGeolocation(IPINFO_TOKEN);
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