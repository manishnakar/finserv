const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// NSDL API endpoint URL (Placeholder, replace with actual URL)
const nsdlApiUrl = 'https://nsdlapi.com/pan/details';
// Your NSDL API credentials (Placeholder, replace with actual credentials)
const apiUsername = 'your_username';
const apiPassword = 'your_password';
const apiKey = 'your_api_key'; // If required

app.post('/get-fathers-name', async (req, res) => {
  try {
    const { pan } = req.body;
    if (!pan) {
      return res.status(400).json({ message: 'PAN number is required' });
    }

    // Construct the request to NSDL API
    const auth = `Basic ${Buffer.from(`${apiUsername}:${apiPassword}`).toString('base64')}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: auth,
    };
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    const nsdlApiReqBody = { pan }; // Adjust based on NSDL API requirements

    const nsdlApiResponse = await axios.post(nsdlApiUrl, nsdlApiReqBody, { headers });

    if (nsdlApiResponse.status === 200) {
      // Extract father's name from the response (assuming it's in a specific format)
      const fathersName = nsdlApiResponse.data.fathers_name; // Adjust based on actual response structure
      res.json({ fathersName });
    } else {
      res.status(422).json({ message: 'Failed to retrieve father\'s name' });
    }
  } catch (error) {
    console.error('Error fetching father\'s name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
