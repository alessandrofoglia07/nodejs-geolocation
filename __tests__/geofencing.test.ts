import { Geofencing } from '../lib/cjs/index.cjs';

const geofencing = new Geofencing();

describe('Geofencing', () => {

    it('Should add a geofence and get all the geofences', () => {
        geofencing.addGeofence('test', { lat: 0, lon: 0 }, 100, { customMetaData: 'test' });
        expect(geofencing.getGeofences()).toEqual([{
            id: 'test',
            position: {
                lat: 0,
                lon: 0
            },
            radius: 100,
            metadata: {
                customMetaData: 'test'
            }
        }]);
    });

    it('Should throw error if geofence already exists', () => {
        expect(() => {
            geofencing.addGeofence('test', { lat: 100, lon: 100 }, 200, { customMetaData: 'test1' });
        }).toThrowError('Geofence already exists');
    });

    it('Should remove a geofence', () => {
        geofencing.removeGeofence('test');
        expect(geofencing.getGeofences()).toEqual([]);
    });

    it('Should clear all geofences', () => {
        geofencing.addGeofence('test', { lat: 0, lon: 0 }, 100, { customMetaData: 'test' });
        geofencing.addGeofence('test1', { lat: 100, lon: 100 }, 200, { customMetaData: 'test1' });
        geofencing.clearGeofences();
        expect(geofencing.getGeofences()).toEqual([]);
    });

    it('Should emit enter event', () => {
        const homePos = { lat: 40.7128, lon: -74.0060 };
        const data = { description: 'Home sweet home' };
        geofencing.addGeofence('home', homePos, 1000, data);

        const spy = jest.spyOn(geofencing, 'on');

        geofencing.on('enter', (geofence) => {
            expect(geofence).toEqual({
                id: 'home',
                position: homePos,
                radius: 1000,
                metadata: data
            });
        });
        geofencing.updateLocation({ latitude: 40.7120, longitude: -74.0065 });

        expect(spy).toHaveBeenCalled();

        geofencing.clearGeofences();
    });

    it('Should emit exit event', () => {
        const homePos = { lat: 40.7128, lon: -74.0060 };
        const data = { description: 'Home sweet home' };

        const spy = jest.spyOn(geofencing, 'on');

        geofencing.addGeofence('home', homePos, 1000, data);
        geofencing.on('exit', (geofence) => {
            expect(geofence).toEqual({
                id: 'home',
                position: homePos,
                radius: 1000,
                metadata: data
            });
        });
        geofencing.updateLocation({ latitude: 40.7120, longitude: -74.0065 });

        expect(spy).toHaveBeenCalled();
    });

    it('Should check if a position is inside a geofence', () => {
        geofencing.clearGeofences();

        const homePos = { lat: 40.7128, lon: -74.0060 };
        const data = { description: 'Home sweet home' };
        geofencing.addGeofence('home', homePos, 1000, data);

        expect(geofencing.isInsideGeofence({ latitude: 40.7120, longitude: -74.0065 }, 'home')).toBe(true);
    });
})

