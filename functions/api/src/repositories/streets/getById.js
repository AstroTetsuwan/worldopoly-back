const { database } = require('../../../../firebaseApp');
const countriesRepository = require('../countries/repository');
const citiesRepository = require('../cities/repository');

module.exports = async (streetId) => {
    const snapshot = await database.ref(`streets/${streetId}`).once('value');
    if (snapshot.exists()) {
        const street = snapshot.val();

        street.city = await citiesRepository.getById(street.cityId);
        delete street.cityId;

        street.city.country = await countriesRepository.getById(street.city.countryId);
        delete street.city.countryId;

        // TODO GET OWNER

        return snapshot.val();
    }
    return null;
}