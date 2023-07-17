require('dotenv').config();
import NodeGeolocation from '../lib/cjs/index.cjs';

export const { IPINFO_KEY, TESTIP, IP2LOCATION_KEY, HERE_KEY } = process.env;

if (!IPINFO_KEY || !TESTIP || !IP2LOCATION_KEY) {
    throw new Error('Please define IPINFO_KEY, TESTIP and IP2LOCATION_KEY in .env file to run tests');
}

test('NodeGeolocation should be defined', () => {
    expect(NodeGeolocation).toBeDefined();
    expect(new NodeGeolocation('test')).toBeDefined();
});