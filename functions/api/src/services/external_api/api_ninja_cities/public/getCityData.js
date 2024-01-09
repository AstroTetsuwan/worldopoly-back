const api = require('../private/api');
const adapter = require('../private/adapter');

const getCityData = async (name, code) => {
    return adapter.toCityData(
        await api.getData(name, code)
    )
}

module.exports = getCityData;