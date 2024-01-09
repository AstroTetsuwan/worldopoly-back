
const wikipedia = require("../../api/src/services/external_api/wikipedia/service");

const test = async () => {
    await wikipedia.getCountryData({
        name: "France",
        code: "FR"
    });
}

test();