<div align='center'>

# **nodejs-geolocation**

**nodejs-geolocation** is a lightweight library that bundles all the most important geolocation tools and services, simplifying geolocation tasks and calculations.

[![npm version](https://img.shields.io/npm/v/nodejs-geolocation.svg?style=flat-square)](https://www.npmjs.org/package/nodejs-geolocation)
[![install size](https://packagephobia.com/badge?p=nodejs-geolocation@1.7.3)](https://packagephobia.com/result?p=nodejs-geolocation@1.7.3)
[![GitHub](https://img.shields.io/github/license/alessandrofoglia07/nodejs-geolocation)](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/alessandrofoglia07/nodejs-geolocation)](https://github.com/alessandrofoglia07/nodejs-geolocation)

<br>
</div>

## Installation

You can install this library with [npm](https://www.npmjs.com/):

```bash
npm install nodejs-geolocation
```

<br>

## Loading and configuration

nodejs-geolocation supports both CommonJS and ES Modules.

### ES Modules / TypeScript (recommended)

```typescript
import NodeGeolocation from 'nodejs-geolocation';

const geo = new NodeGeolocation('applicationName');
```

### CommonJS

```javascript
const NodeGeolocation = require('nodejs-geolocation').default;

const geo = new NodeGeolocation('applicationName');
```

<br>

## Usage

### Get geolocation data from IP address

nodejs-geolocation supports **IPInfo** and **IP2Location** as geolocation providers.
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

<br>

### Get distance between two points

nodejs-geolocation uses the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate the distance between two points on earth, based on their coordinates.

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

### Get geocoding data from address

nodejs-geolocation supports **OpenStreetMap Nominatim API** and **Here Location API** as geocoding provider.

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

<br>

### Get reverse geocoding data from coordinates

nodejs-geolocation supports **OpenStreetMap Nominatim API** and **Here Location API** as reverse geocoding provider.

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

### Unit conversion

nodejs-geolocation comes with a built-in unit conversion method.

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

## License

[MIT](https://github.com/alessandrofoglia07/nodejs-geolocation/blob/main/LICENSE)
