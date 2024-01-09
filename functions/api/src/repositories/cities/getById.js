const db = require('../../db');
const countriesRepository = require('../countries/repository');

module.exports = async (cityId) => {
    const snapshot = await db.read(`cities/${cityId}`);
    if (snapshot.exists()) {
        const city = snapshot.val();
        city.country = await countriesRepository.getById(city.countryId);
        delete city.countryId;
        return city;
    }
    return null;
}