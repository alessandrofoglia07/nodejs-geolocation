import https from 'https';
/**
 * Get data from api (https)
 * @param url Url to get data from
 * @param applicationID Application ID
 * @returns Data from url
 */
const httpsGet = (url, applicationID) => {
    const options = {
        headers: {
            'User-Agent': applicationID
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
