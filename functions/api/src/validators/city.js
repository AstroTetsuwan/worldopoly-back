module.exports = (city) => {
    if (!city) {
        return { isValid: false, error: "City not found" };
    }

    if (!city.name) {
        return { isValid: false, error: "City name field is required" };
    }

    if (!city.country) {
        return { isValid: false, error: "City country field is required" };
    }

    if (!city.country.name) {
        return { isValid: false, error: "Street city country name field is required" };
    }

    if (!city.country.code) {
        return { isValid: false, error: "Street city country code field is required" };
    }

    return { isValid: true };
}