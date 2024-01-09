module.exports = (cityName, code, postcode = null) => {
    return `${cityName}_${code.toUpperCase()}${postcode ? `_${postcode}` : ''}`;
}