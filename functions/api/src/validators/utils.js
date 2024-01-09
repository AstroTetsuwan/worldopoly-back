/**
 * 
 * @returns {object} { isValid: true }
 */
const valid = () => ({ isValid: true });


/**
 * 
 * @param {string} message
 * @returns {object} { isValid: false, error: message }
 */
const invalid = message => ({ isValid: false, error: message });


/**
 *  
 * @param {string} field
 * @returns {object} { isValid: false, error: message }
 */
const invalidMissingField = field => invalid(`${field} field is required`);

module.exports = {
    valid,
    invalid,
    invalidMissingField
}