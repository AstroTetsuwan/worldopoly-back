
const toCityData = (data) => {
    return {
        population: data.population || null,
        isCapital: data.is_capital || null
    };
}

module.exports = {
    toCityData
};