const validators = require('../../src/validators/validators');

describe('validators.coords', () => {
    // Test case for valid coordinates
    test('Valid float coordinates should return isValid: true', () => {
        const result = validators.coords(40.7128, 74.0060);
        expect(result.isValid).toBe(true);
    });
    
    // Test case for valid coordinates
    test('Valid String coordinates should return isValid: true', () => {
        const result = validators.coords("40.7128", "74.0060");
        expect(result.isValid).toBe(true);
    });

    test('Not numbers should return isValid: false and an error message', () => {
        const result = validators.coords('a', 'b');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Coordinates must be numbers');
    });

    // Test case for missing coordinates
    test('Missing coordinates should return isValid: false and an error message', () => {
        const latResult = validators.coords(null, 74.0060);
        expect(latResult.isValid).toBe(false);
        expect(latResult.error).toBe('Missing coordinates');
        const lngResult = validators.coords(40.7128, null);
        expect(lngResult.isValid).toBe(false);
        expect(lngResult.error).toBe('Missing coordinates');
    });

    // Test case for invalid coordinates
    test('Invalid coordinates should return isValid: false and an error message', () => {
        const result = validators.coords(100, 200);
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Invalid coordinates');
    });
});