require('dotenv').config();
import NodeGeolocation from '../dist/index.mjs';

test('NodeGeolocation should be defined', () => {
    expect(NodeGeolocation).toBeDefined();
    expect(new NodeGeolocation('')).toBeDefined();
});

test('Should return geolocation data', async () => {

    const GeoIP = new NodeGeolocation(process.env.IPINFO_KEY);

    const ip = process.env.IPINFO_TESTIP;

    if (!ip) throw new Error("IPINFO_TESTIP env variable is not defined, could not run test. Please define it in .env file.");

    const data = await GeoIP.getLocation(ip);

    expect(data).toBeDefined();
    expect(data.ip).toBe(ip);
});
