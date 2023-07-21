export default function toFormatPos(pos) {
    let lat;
    let lon;
    if ('lat' in pos && 'lon' in pos) {
        lat = pos.lat;
        lon = pos.lon;
    }
    else if ('latitude' in pos && 'longitude' in pos) {
        lat = pos.latitude;
        lon = pos.longitude;
    }
    else if ('x' in pos && 'y' in pos) {
        lat = pos.x;
        lon = pos.y;
    }
    else {
        throw new Error('Invalid position');
    }
    const formatPos = {
        lat,
        lon
    };
    return formatPos;
}
