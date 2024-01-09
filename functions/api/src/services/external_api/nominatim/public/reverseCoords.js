const api = require('../private/api');
const adapter = require('../private/adapter');

const reverseCoords = async (lat, lng) => {
    return adapter.toStreet(
        await api.reverseCoords(lat, lng)
    );
}

module.exports = reverseCoords;