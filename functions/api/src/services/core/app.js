const countriesRepository = require('../../repositories/countries')

/**
 * Populate the database with the countries data in dev mode.
 * 
 * @returns {Promise<void>}
 */
const init = async () => {
    if (config.IS_DEV) {
        countriesRepository.populate();
    }
}

module.exports = {
    init
}