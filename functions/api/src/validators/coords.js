const { valid, invalid } = require('./utils');

/**
 * Validates latitude and longitude coordinates
 * @param {number | string} lat Latitude
 * @param {number | string} lng Longitude
 * @returns {object} { isValid: Boolean, error?: String }
 */
module.exports = (lat, lng) => {
    if (!lat || !lng) {
        return invalid('Missing coordinates');
    }

    if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
        return invalid('Coordinates must be numbers');
    }

    const validator = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    if (!validator.test(`${lat},${lng}`)) {
        return invalid('Invalid coordinates');
    }

    return valid();
}