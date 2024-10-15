const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();
const port = 3000;

// Replace with your Aadhaar API key
const aadhaarApiKey = 'YOUR_API_KEY_HERE';

// Function to validate Aadhaar number
async function validateAadhaar(aadhaarNumber) {
  const url = `https://resident.uidai.gov.in/aadhaarverification/api/v1/public/verify`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${aadhaarApiKey}`,
  };
  const data = {
    'aadhaarNumber': aadhaarNumber,
  };

  try {
    const response = await axios.post(url, data, { headers });
    const xml = response.data;
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);

    if (result.AuthResponse.$.error) {
      throw new Error(result.AuthResponse.$.error);
    }

    const authStatus = result.AuthResponse.Auth.$.status;
    return authStatus === 'Y';
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Express route to handle Aadhaar validation requests
app.post('/validate', async (req, res) => {
  const aadhaarNumber = req.body.aadhaarNumber;
  if (!aadhaarNumber) {
    res.status(400).send({ error: 'Aadhaar number is required' });
    return;
  }

  const isValid = await validateAadhaar(aadhaarNumber);
  res.send({ isValid });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
