const validators = require("../../../../validators/validators");

const formatCity = (address = {}) => {
    return {
        name: address?.city                || "",
        country: {
            name: address?.country             || "",
            code: address?.country_code || ""
        },
        state: address?.state              || "",
        region: address?.region            || "",
        postcode: address?.postcode        || ""
    };
}

const formatStreet = (data) => {
    const address = data?.address || {};
    return {
        boundingBox: data?.boundingbox          || [],
        road: address?.road                     || "",
        suburb: address?.suburb                 || "",
        cityDistrict: address?.city_district    || "",
        city: formatCity(address)
    };
}

/**
 * @param {object} openStreetMapData
 * @returns Street with minimal info formatted from OpenStreetMap Nominatim API data
 */
const toStreet = (openStreetMapData) => {
    if (!openStreetMapData) {
        return null;
    }
    return formatStreet(openStreetMapData);
}

const toStreetShape = (openStreetMapStreetShapeData) => {
    const shape = [];
    if (!openStreetMapStreetShapeData) {
        return shape;
    }
      
    const { features } = openStreetMapStreetShapeData;
    for (var feature of features) {
        const { geometry } = feature;
        const { coordinates, type } = geometry;
        if (type === 'LineString') {
            const shapePart = coordinates
                                .filter(([lng, lat]) => validators.coords(lat, lng).isValid)
                                .map(([lng, lat]) => ({ lat, lng }));
            shape.push(shapePart);
        }
    }
    return shape;
}

module.exports = {
    toStreet,
    toStreetShape
};