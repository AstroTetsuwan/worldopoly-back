const externalApiService = require('../../../external_api/service');
const getStreet = require('../private/getStreet');

module.exports = async (lat, lng) => {
    const street = await externalApiService.reverseCoordsToStreet(lat, lng);
    if (!street) {
        return null;
    }
    return await getStreet(street);
}