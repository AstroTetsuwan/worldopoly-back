const { valid, invalid, invalidMissingField } = require('./utils');


module.exports = (street) => {
    if (!street) return { isValid: false, error: "Street is null" };

    const { road, price, city } = street;

    if (!road) return invalidMissingField("Street road");

    if (!city) return invalidMissingField("Street city");

    if (!city.name) return invalidMissingField("Street city.name");

    if (!city.country) return invalidMissingField("Street city.country");

    if (!city.country.name) return invalidMissingField("Street city.country.name");

    if (!city.country.code) return invalidMissingField("Street city.country.code");

    if (!price) return invalidMissingField("Street price");

    if (isNaN(price)) return invalid("Street price field must be a number");

    return valid();
}