const streetService = require('../../services/core/streets/service');

const validators = require('../../validators/validators');

module.exports = async (req, res) => {
    const { lat, lng } = req.query;
    
    const coordsValidation = validators.coords(lat, lng);
    if (!coordsValidation.isValid) {
        return res.status(400).send(coordsValidation.error);
    }

    const street = await streetService.getStreetFromCoords(lat, lng);

    if (!street) {
        return res.status(404).send('Street not found');
    }

    const streetInfoValidation = validators.street(street);
    if (!streetInfoValidation.isValid) {
        return res.status(400).send(streetInfoValidation.error);
    }
    
    return res.status(200).send(street);
};