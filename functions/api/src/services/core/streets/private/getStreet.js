
const streetsRepository = require('../../../../repositories/streets/repository');
const externalApiService = require('../../../external_api/service');
const getCity = require('./getCity');

/**
 * This function tries to get the street complete data from db.
 * If not found, it will get the data from external api and add it to db
 * @param {object} street Street with minimal information, should come from externalApiService.reverseCoords
 * @param {string} street.road Street name
 * @param {object} street.city City object with minimal information
 * @param {string} street.city.name City name
 * @param {object} street.city.country Country object with minimal information
 * @param {string} street.city.country.code Country code
 * @returns {object} Street object with all information
 */
module.exports = async (street) => {
    console.log('raw street', street);
    const streetId = streetsRepository.getId(
        street.road, 
        street.city.name, 
        street.city.country.code
    );
    const streetFromDb = await streetsRepository.getById(streetId);
    if (streetFromDb) {
        return streetFromDb;
    }

    console.log('street', JSON.stringify(street, null, 2));

    street.city =  await getCity(street.city);
    console.log('street 3', JSON.stringify(street, null, 2));
    street.shape = await externalApiService.getStreetShape(
        street.road, 
        street.city.name, 
        street.city.country.code
    );
    
    console.log('street', street);
    // TODO Recompute bounding box if shape is not null

    // Compute length

    // Compute price

    street.price = 10_000;

    // Create street cause we are not computing all this everytime and the price the user must not change I guess

    return street;
}