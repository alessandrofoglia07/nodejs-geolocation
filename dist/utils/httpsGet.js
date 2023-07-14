import https from 'https';
const httpsGet = (url) => {
    const options = {
        headers: {
            'User-Agent': 'nodejs-geolocation'
        }
    };
    return new Promise((resolve, reject) => {
        https.get(url, options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};
export default httpsGet;
