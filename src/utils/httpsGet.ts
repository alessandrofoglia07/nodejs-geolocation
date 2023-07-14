import https from 'https';

const httpsGet = (url: string, applicationID: string): Promise<string> => {

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
        }).on('error', (err: any) => {
            reject(err);
        });
    });
};

export default httpsGet;