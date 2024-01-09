const api = require('../private/api');
const adapter = require('../private/adapter');

const getStreetShape = async (road, cityName, country) => {
    return adapter.toStreetShape(
        await api.getStreetShapeData(road, cityName, country)
    );
}

module.exports = getStreetShape;