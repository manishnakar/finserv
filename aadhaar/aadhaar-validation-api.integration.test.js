const request = require('supertest');
const app = require('../app');
const axios = require('axios');

describe('Aadhaar Validation API Integration Tests', () => {
  beforeAll(async () => {
    // Mock API response
    axios.post = jest.fn(() => Promise.resolve({ data: { AuthResponse: { $: { status: 'Y' } } } }));
  });

  afterAll(() => {
    // Restore original API implementation
    axios.post.mockRestore();
  });

  describe('POST /validate', () => {
    it('should return 200 OK with valid Aadhaar number', async () => {
      const aadhaarNumber = '123456789012';
      const response = await request(app).post('/validate').send({ aadhaarNumber });
      expect(response.status).toBe(200);
      expect(response.body.isValid).toBe(true);
    });
  });
});
