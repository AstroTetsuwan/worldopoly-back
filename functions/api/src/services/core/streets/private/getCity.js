const externalApiService = require('../../../external_api/service');
const citiesRepository = require('../../../../repositories/cities/repository');
const getCountry = require('./getCountry');



/**
 * This function tries to get the city complete data from db.
 * If not found, it will get the data from external api and add it to db
 * @param {object} city City with minimal information, should come from externalApiService.reverseCoords
 * @param {string} city.name City name  
 * @param {object} city.country Country object with minimal information
 * @param {string} city.country.code Country code
 * @param {string} [city.country.countryName] Country name
 * @returns City object with all information
 */

module.exports = async (city) => {
    // Check if city is in db (repository return null if not else complete city data)
    const cityId = citiesRepository.getId(city.name, city.country.code, city.postcode);
    console.log('cityId', cityId);
    const cityFromDb = await citiesRepository.getById(cityId);
    if (cityFromDb) {
        return cityFromDb;
    }

    // Get city data from external api
    // Add city to db
    const cityData = await externalApiService.getCityData(city.name, city.country.code);
    console.log('cityData', cityData);

    console.log('create', {
        ...city,
        ...cityData,
        country: await getCountry(city.country)
    });
    return await citiesRepository.create({
        ...city,
        ...cityData,
        country: await getCountry(city.country)
    });
}