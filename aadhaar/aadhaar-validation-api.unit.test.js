const validateAadhaar = require('../validateAadhaar');

describe('validateAadhaar function', () => {
  it('should return true with valid Aadhaar number', () => {
    const aadhaarNumber = '123456789012';
    const result = validateAadhaar(aadhaarNumber);
    expect(result).toBe(true);
  });

  it('should return false with invalid Aadhaar number', () => {
    const aadhaarNumber ='invalid';
    const result = validateAadhaar(aadhaarNumber);
    expect(result).toBe(false);
  });
});
