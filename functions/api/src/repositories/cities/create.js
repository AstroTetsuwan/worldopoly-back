const db = require('../../db');
const getId = require('./getId');


module.exports = async (data) => {
    const { 
        name, 
        country, 
        state, 
        region, 
        postcode, 
        population, 
        isCapital 
    } = data;

    const cityId = getId(name, country.code.toUpperCase(), postcode);

    // TODO Check if city already exists
    // Maybe compare exisiting data with new data and only update if needed

    await db.create(`cities/${cityId}`, {
        name,
        countryId: country.code.toUpperCase(),
        state,
        region,
        postcode,
        population,
        isCapital
    });

    return data;
}