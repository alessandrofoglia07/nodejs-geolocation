/**
 * Get data from api (https)
 * @param url Url to get data from
 * @param applicationID Application ID
 * @returns Data from url
 */
declare const httpsGet: (url: string, applicationID: string) => Promise<string>;
export default httpsGet;
