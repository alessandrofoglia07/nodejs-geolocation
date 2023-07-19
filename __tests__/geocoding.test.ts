import NodeGeolocation from '../lib/cjs/index.cjs';
import { HERE_KEY } from './index.test';

describe('NodeGeolocation should return geocoding data correctly using Nominatim', () => {

    const geo = new NodeGeolocation('test');
    geo.geocodingOptions = {
        service: 'Nominatim',
        key: ''
    };

    it('Should return geocoding data', async () => {
        const data = await geo.getGeocoding('Rome, Italy');
        expect(data).toBeDefined();
        expect(Math.floor(data.position.lat)).toBe(41);
        expect(Math.floor(data.position.lon)).toBe(12);
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

describe('NodeGeolocation should return geocoding data correctly using Here', () => {

    const geo = new NodeGeolocation('test');
    geo.geocodingOptions = {
        service: 'Here',
        key: HERE_KEY!
    };

    it('Should return geocoding data', async () => {
        const data = await geo.getGeocoding('Rome, Italy');
        expect(data).toBeDefined();
        expect(Math.floor(data.position.lat)).toBe(41);
        expect(Math.floor(data.position.lon)).toBe(12);
    });

    it('Should return reverse geocoding data', async () => {
        const data = await geo.getReverseGeocoding({ lat: 41.8933203, lon: 12.4829321 });
        expect(data).toBeDefined();
        expect(data.address.city).toBe("Rome");
        expect(data.address.countryName).toBe("Italy");
    });
});
