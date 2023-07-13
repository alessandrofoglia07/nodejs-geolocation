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