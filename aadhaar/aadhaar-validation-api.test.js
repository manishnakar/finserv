const request = require('supertest');
const app = require('../app');
const axios = require('axios');

describe('Aadhaar Validation API', () => {
  describe('POST /validate', () => {
    it('should return 200 OK with valid Aadhaar number', async () => {
      const aadhaarNumber = '123456789012';
      const response = await request(app).post('/validate').send({ aadhaarNumber });
      expect(response.status).toBe(200);
      expect(response.body.isValid).toBe(true);
    });

    it('should return 400 Bad Request with invalid Aadhaar number', async () => {
      const aadhaarNumber ='invalid';
      const response = await request(app).post('/validate').send({ aadhaarNumber });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid Aadhaar number');
    });

    it('should return 500 Internal Server Error with API error', async () => {
      const aadhaarNumber = '123456789012';
      axios.post = jest.fn(() => Promise.reject(new Error('API error')));
      const response = await request(app).post('/validate').send({ aadhaarNumber });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });
});
