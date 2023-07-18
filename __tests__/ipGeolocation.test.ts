import NodeGeolocation from '../lib/cjs/index.cjs';
import { IPINFO_KEY, TESTIP, IP2LOCATION_KEY } from './index.test';

if (!IPINFO_KEY || !TESTIP || !IP2LOCATION_KEY) {
    throw new Error('Please define IPINFO_KEY, TESTIP and IP2LOCATION_KEY in .env file to run tests');
}

describe('NodeGeolocation should return geolocation data correctly using IPInfo', () => {

    const geo = new NodeGeolocation('test');

    it('Should return geolocation data', async () => {
        geo.ipGeolocationOptions = {
            service: 'ipinfo',
            key: IPINFO_KEY!
        };
        const data = await geo.getLocation(TESTIP!);
        expect(data).toBeDefined();
        expect(data.city).toBeDefined();
        expect(data.region).toBeDefined();
        expect(data.countryCode).toBeDefined();
        expect(data.timezone).toBeDefined();
        expect(data.position).toBeDefined();
        expect(data.org).toBeDefined();
        expect(data.asn).toBeDefined();
        expect(data.postal).toBeDefined();
        expect(data.raw).toBeDefined();
    });

    it('Should throw error if api key is not valid', async () => {
        geo.ipGeolocationOptions = {
            service: 'ipinfo',
            key: 'invalid'
        };
        await expect(geo.getLocation(TESTIP!)).rejects.toThrow();
    });
});

describe('NodeGeolocation should return geolocation data correctly using IP2Location', () => {

    const geo = new NodeGeolocation('test');

    it('Should return geolocation data', async () => {
        geo.ipGeolocationOptions = {
            service: 'ip2location',
            key: IP2LOCATION_KEY!
        };
        const data = await geo.getLocation(TESTIP!);
        expect(data).toBeDefined();
        expect(data).toBeDefined();
        expect(data.city).toBeDefined();
        expect(data.region).toBeDefined();
        expect(data.countryCode).toBeDefined();
        expect(data.timezone).toBeDefined();
        expect(data.position).toBeDefined();
        expect(data.org).toBeDefined();
        expect(data.asn).toBeDefined();
        expect(data.postal).toBeDefined();
        expect(data.raw).toBeDefined();
    });

    it('Should throw error if api key is not valid', async () => {
        geo.ipGeolocationOptions = {
            service: 'ip2location',
            key: 'invalid'
        };
        await expect(geo.getLocation(TESTIP!)).rejects.toThrow();
    });
});