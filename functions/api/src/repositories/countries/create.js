const db = require('../../db');

module.exports = async (data) => {
    const { name, code } = data;
    const countryId = code.toUpperCase();

    // TODO Validate
    const country = {
        name,
        code: code.toUpperCase(),
    };

    // TODO Check if country already exists
    // Maybe compare exisiting data with new data and only update if needed

    await db.create(`countries/${countryId}`, country);
        
    return country;
}