# Aadhaar Validation API

A Node.js application to validate Aadhaar numbers using the Aadhaar API.

## Prerequisites

* Docker installed on your local machine
* Node.js and npm installed on your local machine (optional)

## Building the Docker Image

1. Clone the repository: `git clone https://github.com/your-username/aadhaar-validation-api.git`
2. Change into the cloned repository: `cd aadhaar-validation-api`
3. Build the Docker image: `docker build -t aadhaar-validation-api.`

## Running the Docker Container

1. Run the Docker container: `docker run -p 3000:3000 aadhaar-validation-api`
2. The API will be available at `http://localhost:3000`

## Testing the API

1. Use a tool like `curl` or Postman to send a POST request to `http://localhost:3000/validate`
2. Include the Aadhaar number in the request body in JSON format: `{"aadhaarNumber": "123456789012"}`

## Environment Variables

* `Aadhaar_API_KEY`: Your Aadhaar API key (required)
* `NODE_ENV`: Set to `production` for production environment (optional)

## Troubleshooting

* Check the Docker logs for errors: `docker logs -f aadhaar-validation-api`
* Check the Node.js logs for errors: `docker exec -it aadhaar-validation-api npm run logs`

## Notes

* Make sure to replace `your-username` with your actual GitHub username.
* Make sure to replace `123456789012` with a valid Aadhaar number.
* The Aadhaar API key is required to use this API.
* This API is for demonstration purposes only and should not be used for production without proper authorization and authentication.
