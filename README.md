<div align='center'>

<br>

<h1 style="font-weight:700">nodejs-geolocation</h1>

**nodejs-geolocation** is a Node.js library that bundles all the most important geolocation tools and services, simplifying geolocation tasks and calculations.

[![npm version](https://img.shields.io/npm/v/nodejs-geolocation.svg?style=flat-square)](https://www.npmjs.org/package/nodejs-geolocation)
[![install size](https://packagephobia.com/badge?p=nodejs-geolocation@latest)](https://packagephobia.com/result?p=nodejs-geolocation@latest)
[![GitHub](https://img.shields.io/github/license/alessandrofoglia07/nodejs-geolocation)](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/alessandrofoglia07/nodejs-geolocation)](https://github.com/alessandrofoglia07/nodejs-geolocation)

<br>
</div>

<h2>Table of contents</h2>

- [Supported Providers](#supported-providers)
- [Installation](#installation)
- [Loading and configuration](#loading-and-configuration)
  - [ES Modules / TypeScript (recommended)](#es-modules--typescript-recommended)
  - [CommonJS](#commonjs)
- [Usage](#usage)
  - [Get geolocation data from IP address](#get-geolocation-data-from-ip-address)
    - [IPInfo Get your API key](#ipinfo-get-your-api-key)
    - [IP2Location Get your API key](#ip2location-get-your-api-key)
    - [Result data](#result-data)
  - [Get geocoding data from address](#get-geocoding-data-from-address)
    - [OpenStreetMap Nominatim API](#openstreetmap-nominatim-api)
    - [Here Location API Get your API key](#here-location-api-get-your-api-key)
    - [Result data](#result-data-1)
  - [Get reverse geocoding data from coordinates](#get-reverse-geocoding-data-from-coordinates)
    - [OpenStreetMap Nominatim API](#openstreetmap-nominatim-api-1)
    - [Here Location API Get your API key](#here-location-api-get-your-api-key-1)
    - [Result data](#result-data-2)
  - [Geofencing](#geofencing)
  - [Get distance between two points](#get-distance-between-two-points)
  - [Timezone converter](#timezone-converter)
    - [Timezone type (Supported formats)](#timezone-type-supported-formats)
  - [Unit conversion](#unit-conversion)
  - [Typescript interfaces (TS only)](#typescript-interfaces-ts-only)
- [License](#license)

<br>

## Supported Providers

`nodejs-geolocation` supports the following IP geolocation providers:

-   [IPInfo](https://ipinfo.io/)
-   [IP2Location](https://www.ip2location.com/)

`nodejs-geolocation` supports the following geocoding providers:

-   [OpenStreetMap Nominatim API](https://nominatim.org/)
-   [Here Location API](https://developer.here.com/)

## Installation

You can install this library with [npm](https://www.npmjs.com/):

```bash
npm install nodejs-geolocation
```

<br>

## Loading and configuration

`nodejs-geolocation` supports both CommonJS and ES Modules.

### ES Modules / TypeScript (recommended)

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('<ApplicationName>');
```

### CommonJS

```javascript
const NodeGeolocation = require('nodejs-geolocation').default;

const geo = new NodeGeolocation('<ApplicationName>');
```

<br>

## Usage

### Get geolocation data from IP address

`nodejs-geolocation` supports **IPInfo** and **IP2Location** as geolocation providers.
<br/>
The examples are written in TypeScript, but the same methods are available in JavaScript.

#### IPInfo [Get your API key](https://ipinfo.io/signup)

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

// Set ipGeolocationOptions
geo.ipGeolocationOptions = {
    service: 'ipinfo',
    key: 'mySecretApiKeyFromIPInfo'
};

// Get geolocation data from IP address
geo.getLocation('111.6.105.201')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### IP2Location [Get your API key](https://www.ip2location.io/sign-up)

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

// Set ipGeolocationOptions
geo.ipGeolocationOptions = {
    service: 'ip2location',
    key: 'mySecretApiKeyFromIP2Location'
};

// Get geolocation data from IP address
geo.getLocation('111.6.105.201')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Result data

The result data is automatically formatted in a standard format, regardless of the provider used.

```typescript
{
    ip: string;
    city: string;
    region: string;
    countryCode: string;
    timezone: string;
    position: {
        lat: number;
        lon: number;
    }
    org: string;
    asn: string;
    postal: string;
    raw: any; // Raw data from provider for advanced usage
}
```

<br>

### Get geocoding data from address

`nodejs-geolocation` supports **OpenStreetMap Nominatim API** and **Here Location API** as geocoding provider.

#### OpenStreetMap Nominatim API

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

// Set geocodingOptions
geo.geocodingOptions = {
    service: 'Nominatim',
    key: '' // Not required
};

// Get geocoding data from address
geo.getGeocoding('Rome, Italy')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Here Location API [Get your API key](https://developer.here.com/sign-up)

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

// Set geocodingOptions
geo.geocodingOptions = {
    service: 'Here',
    key: 'mySecretApiKeyFromHere'
};

// Get geocoding data from address
geo.getGeocoding('Rome, Italy')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Result data

The result data is automatically formatted in a standard format, regardless of the provider used.

```typescript
{
    id: string;
    position: {
        lat: number;
        lon: number;
    }
    address: {
        city: string;
        county: string;
        state: string;
        country: string;
        countryCode: string;
    }
    displayName: string;
    boundingBox: {
        north: number;
        south: number;
        east: number;
        west: number;
    }
    raw: any; // Raw data from provider for advanced usage
}
```

<br>

### Get reverse geocoding data from coordinates

`nodejs-geolocation` supports **OpenStreetMap Nominatim API** and **Here Location API** as reverse geocoding provider.

#### OpenStreetMap Nominatim API

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

// Set geocodingOptions
geo.geocodingOptions = {
    service: 'Nominatim',
    key: '' // Not required
};

const position = { lat: 41.8933203, lon: 12.4829321 };

// Get reverse geocoding data from coordinates
geo.getReverseGeocoding(position)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Here Location API [Get your API key](https://developer.here.com/sign-up)

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

// Set geocodingOptions
geo.geocodingOptions = {
    service: 'Here',
    key: 'mySecretApiKeyFromHere'
};

const position = { lat: 41.8933203, lon: 12.4829321 };

// Get reverse geocoding data from coordinates
geo.getReverseGeocoding(position)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Result data

The result data of reverse geocoding is not formatted by `nodejs-geolocation` for more accuracy and flexibility. The result data is the raw data from the provider used.

<br>

### Geofencing

`nodejs-geolocation` has a built-in geofencing system that allows you to check if a point is inside a polygon.

```typescript
import { Geofencing } from 'nodejs-geolocation';

const geofencing = new Geofencing();

// Add a geofence
// addGeofence(id: string, position: Position, radius: number, metadataObject?: any)
geofencing.addGeofence('home', { lat: 40.7128, lon: -74.006 }, 1000, { description: 'Home sweet home' });

// Check if a point is inside a geofence
// isInsideGeofence(id: string, position: Position)
const isInside = geofencing.isInsideGeofence('home', { lat: 40.7128, lon: -74.006 });

console.log(isInside); // true

// Get all geofences
const geofences = geofencing.getGeofences();

// Remove a geofence
// removeGeofence(id: string)
geofencing.removeGeofence('home');

// Remove all geofences
geofencing.clearGeofences();
```

You can even use the geofencing system with **events**. With the `updateLocation()` method, you can update the position of an object and if that enters or leaves a geofence, an event will be triggered.

```typescript
import { Geofencing } from 'nodejs-geolcation';

const geofencing = new Geofencing();

// Add a geofence
geofencing.addGeofence('home', { lat: 40.7128, lon: -74.006 }, 1000, { description: 'Home sweet home' });

// Add the event listeners
geofencing.on('enter', (geofence) => {
    console.log(`Entered geofence ${geofence.id}`);
});

geofencing.on('exit', (geofence) => {
    console.log(`Exited geofence ${geofence.id}`);
});

// Update location method
// updateLocation(position: Position)
geofencing.updateLocation({ latitude: 40.712, longitude: -74.0065 }); // trigger 'enter' event for geofence 'home'
```

<br>

### Get distance between two points

`nodejs-geolocation` uses the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate the distance between two points on earth, based on their coordinates.

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

/**
 * Accepted position formats:
 * { lat: number, lon: number }
 * { latitude: number, longitude: number }
 * { x: number, y: number }
 */

// Rome, Italy
const pos1 = { lat: 41.902782, lon: 12.496366 };
// Tokyo, Japan
const pos2 = { latitude: 35.685013, longitude: 139.7514 };

const distance = geo.calculateDistance(pos1, pos2);
console.log(distance); // 9857

/**
 * Options object
 * unit?: 'km' | 'yd' | 'mi' | 'm' | 'ft'
 * format?: boolean
 * exact?: boolean
 */
// Result:

console.log(geo.calculateDistance(pos1, pos2, { unit: 'mi' })); // 6125

console.log(geo.calculateDistance(pos1, pos2, { format: true })); // "9857 kilometers"

console.log(geo.calculateDistance(pos1, pos2, { unit: 'mi', exact: true })); // 6124.860370167203
```

<br>

### Timezone converter

Converting timezones is usually tough, but `nodejs-geolocation` makes it easy with an integrated timezone converter.

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

const from = 'PST';
const to = 'UTC+3';
const datePST = new Date('2022-01-01T00:00:00Z');

const dateUTC3 = geo.timeZoneConvert(date, from, to);

console.log(dateUTC3.toISOString()); // "2022-01-01T11:00:00.000Z"
```

#### Timezone type (Supported formats)

```typescript
type Timezone =
  | 'GMT'
  | 'UTC'
  | `UTC${'+' | '-'}${number}`
  | `UTC${'+' | '-'}${number}:${number}`
  | 'EST'
  | 'CST'
  | 'PST'
  | 'ChinaST'
  | 'IST'
  | 'EET'
  | 'CET'
  | 'AEST`;
```

<br>

### Unit conversion

`nodejs-geolocation` comes with a built-in unit conversion method.

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('MyApp');

/**
 * Accepted unit formats:
 * km | yd | mi | m | ft
 */

// Convert 1500 meters to kilometers
const km = geo.convertUnit(1500, 'm', 'km');
console.log(km); // 1.5
```

<br>

### Typescript interfaces (TS only)

You can import the interfaces from the package to use them in your project.

```typescript
// Import interfaces (example)
import { Position, Unit, DistanceCalculationOptions } from 'nodejs-geolocation';

const pos: Position = { lat: 41.8933203, lon: 12.4829321 };

const myUnit: Unit = 'yd';

const options: DistanceCalculationOptions = {
    unit: myUnit,
    format: true,
    exact: true
};
```

<br>

## License

[MIT](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/LICENSE)
