
const countriesRepository = require('../../../../repositories/countries/repository');
const externalApiService = require('../../../external_api/service');

/**
 * This function tries to get the country complete data from db.
 * If not found, it will get the data from external api and add it to db
 * @param {object} country Country with minimal information, should come from externalApiService.reverseCoords
 * @param {string} country.code Country code
 * @param {string} [country.countryName] Country name
 * @returns {object} Country object with all information
 */
module.exports = async (country) => {
    console.log('country', country);
    const countryId = countriesRepository.getId(country.code.toUpperCase());
    console.log('countryId', countryId);
    const countryFromDb = await countriesRepository.getById(countryId);
    if (countryFromDb) {
        return countryFromDb;
    } 
    
    const countryData = await externalApiService.getCountryData(country.code.toUpperCase());
    console.log('countryData', countryData);
    return await countriesRepository.create({
        ...country,
        ...countryData
    });
}