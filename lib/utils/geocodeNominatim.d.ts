declare const geocodeNominatim: (address: string) => Promise<{
    lat: number;
    lon: number;
}>;
export default geocodeNominatim;
