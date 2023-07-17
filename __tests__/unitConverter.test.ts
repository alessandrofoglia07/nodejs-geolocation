import NodeGeolocation from '../lib/cjs/index.cjs';

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