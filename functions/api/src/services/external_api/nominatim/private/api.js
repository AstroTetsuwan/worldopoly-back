const axios = require("axios");

/**
 * Reverse geocoding using OpenStreetMap Nominatim API
 * @param {number} lat Latitude
 * @param {number} lng Longitude
 * @returns {object | null} data | null
 */
const reverseCoords = async (lat, lng) => {
    const params = `format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    const { data, status } = await axios.get(`https://nominatim.openstreetmap.org/reverse?${params}`);
    if (status !== 200) {
        return null;
    }

    return data;
}

const getStreetShapeData = async (road, cityName, country) => {
    if (!road || !cityName || !country) {
        return null;
    }

    const filters = `street=${road}&city=${cityName}&country=${country}`;
    const options = `format=geocodejson&polygon_geojson=1&dedupe=0&limit=1000&addressdetails=1`;
    const { data, status } = await axios.get(`https://nominatim.openstreetmap.org/search?${filters}&${options}`);
    if (status !== 200) {
        return null;
    }

    return data;
}

module.exports = {
    reverseCoords,
    getStreetShapeData
}