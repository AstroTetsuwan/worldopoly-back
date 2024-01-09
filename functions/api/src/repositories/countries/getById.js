const db = require('../../db');

module.exports = async (countryId) => {
    const snapshot = await db.read(`countries/${countryId}`);
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return null;
}