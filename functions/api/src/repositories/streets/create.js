const db = require('../../db');
const getId = require('./getId');

const cityRepository = require('../cities/repository');

module.exports = async (data) => {
    const { road, boundingBox, suburb, cityDistrict, city, shape, price } = data;
    const { name: cityName, code, postcode } = city;

    // TODO Validate

    const streetId = getId(road, cityName, code);
    
    // TODO Check if country already exists
    // Maybe compare exisiting data with new data and only update if needed
    
    const cityId = cityRepository.getId(cityName, code, postcode);

    const completeStreet = {
        road,
        boundingBox,
        suburb,
        cityDistrict,
        cityId,
        shape,
        price
    };

    await db.create(`streets/${streetId}`, completeStreet);
    return completeStreet;
}