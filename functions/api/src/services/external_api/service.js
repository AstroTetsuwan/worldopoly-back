const apiNinjaCities = require('./api_ninja_cities/service');
const nominatim = require('./nominatim/service');


const reverseCoordsToStreet = async (lat, lng) => {
    return await nominatim.reverseCoords(lat, lng);
}

const getCityData = async (name, code) => {
    return await apiNinjaCities.getCityData(name, code);
}

const getCountryData = async (code) => {
    return {};
}

const getStreetShape = async (road, cityName, country) => {
    return await nominatim.getStreetShape(road, cityName, country);
}

module.exports = {
    reverseCoordsToStreet,
    getCityData,
    getCountryData,
    getStreetShape
}