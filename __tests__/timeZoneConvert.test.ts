import NodeGeolocation from '../lib/cjs/index.cjs';

describe('NodeGeolocation should convert timezones correctly', () => {

    const geo = new NodeGeolocation('test');

    it('Should convert date from PST timezone to UTC+3', () => {
        const date = new Date('2022-01-01T00:00:00Z');
        const from = 'PST';
        const to = 'UTC+3';
        const result = geo.timeZoneConvert(date, from, to);
        expect(result.toISOString()).toBe('2022-01-01T11:00:00.000Z');
    });

    it('Should convert date from UTC+3:30 to AEST', () => {
        const date = new Date('2022-01-01T00:00:00Z');
        const from = 'UTC+3:30';
        const to = 'AEST';
        const result = geo.timeZoneConvert(date, from, to);
        expect(result.toISOString()).toBe('2022-01-01T06:30:00.000Z');
    });

    it('Should return the same date if from and to timezones are the same', () => {
        const date = new Date('2022-01-01T00:00:00Z');
        const from = 'PST';
        const to = 'PST';
        const result = geo.timeZoneConvert(date, from, to);
        expect(result).toBe(date);
    });
});