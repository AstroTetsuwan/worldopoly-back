const db = require('../../db');
const fs = require('fs');

const countriesDataAlreadyPopulated = async () => await db.read('countries/AF');

module.exports = async () => {
    try {
        const countries = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
        
        if (await countriesDataAlreadyPopulated()) {
            return;
        }
        
        for (const country of countries) {
            const { code } = country;
            await db.create(`countries/${code}`, country);
        }
        
    } catch (error) {
        console.log(error);
    }
}