import NodeGeolocation from '../lib/cjs/index.cjs';

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