const config = require('../../../../../../config');
const axios = require("axios");

const getData = async (name, code) => {
    const params = `name=${name}&country_code=${code.toUpperCase()}`;
    const { data, status } = await axios.get(`https://api.api-ninjas.com/v1/city?${params}`, {
        headers: { "X-Api-Key": config.API_NINJA_API_KEY }
    });

    const cityNotFound = status !== 200 || !data || data.length === 0;
    if (cityNotFound) {
        return null;
    }

    return data[0];
};

module.exports = {
    getData
}