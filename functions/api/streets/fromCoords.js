const axios = require('axios');

const validateCoords = (lat, lng) => {
    const validator = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    return validator.test(`${lat},${lng}`);
}

const getStreet = (lat, lng) => {
    const params = `format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    return axios.get(`https://nominatim.openstreetmap.org/reverse?${params}`);
}

const formatStreet = (data) => {
    const address = data?.address || {};
    return {
        osmId: data?.osm_id                     || 0,
        boundingBox: data?.boundingbox          || [],
        road: address?.road                     || "",
        suburb: address?.suburb                 || "",
        cityDistrict: address?.city_district    || "",
        city: address?.city                     || "",
        state: address?.state                   || "",
        region: address?.region                 || "",
        postcode: address?.postcode             || "",
        country: address?.country               || "",
        countryCode: address?.country_code      || ""
    };
}

const getShape = async (street) => {
    console.log('getshape', street);
    const { road, city, country } = street;
    if (!road || !city || !country) {
        return [];
    }

    const filters = `street=${road}&city=${city}&country=${country}`;
    const options = `format=geocodejson&polygon_geojson=1&dedupe=0&limit=1000&addressdetails=1`;
    const {data, status} = await axios.get(`https://nominatim.openstreetmap.org/search?${filters}&${options}`);
    console.log('status', status);

    if (status !== 200) {
        return [];
    }
    console.log('data', data);
    const shape = [];
  
    const features = data['features'];
    console.log('features', features);
    for (var feature of features) {
        const geometry = feature['geometry'];
        console.log('geometry', geometry);
        if (geometry['type'] === 'LineString') {
            const coordinates = geometry['coordinates'];
            const shapePart = coordinates.map(([lng, lat]) => ({lat, lng}));
            shape.push(shapePart);
        }
    }
    console.log('shape', shape);
    return shape;
}


module.exports = async (req, res) => {
    const {lat, lng} = req.query;

    if (!lat || !lng) {
        return res.status(400).send("Missing coordinates");
    }

    if (!validateCoords(lat, lng)) {
        return res.status(400).send("Invalid coordinates");
    }

    const {data, status} = await getStreet(lat, lng);
    if (status !== 200) {
        return res.status(500).send("Failed to fetch data");
    }

    const street = formatStreet(data);
    street.shape = await getShape(street);

    return res.send(street);
}