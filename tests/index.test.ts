import { getGeolocation } from '../src/index';

test('Should return geolocation data', async () => {
    const ip = process.env.IPINFO_TESTIP;
    if (!ip) throw new Error("IPINFO_TESTIP env variable is not defined, could not run test. Please define it in .env file.");
    const geolocation = await getGeolocation(ip);
    expect(geolocation).toBeDefined();
    expect(geolocation.ip).toBe(ip);
    expect(geolocation.isEU).toBe(true);
});