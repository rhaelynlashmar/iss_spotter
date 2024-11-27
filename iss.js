const needle = require('needle');
/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org?format=json';
  
  // Make HTTP request using needle
  needle.get(url, (error, response, body) => {
    if (error) {
      // handle network errors
      callback(error, null); // if error occurs, pass it to the callback
      return;
    }

    // If non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // Needle parses JSON for us, so we can access response.body
    callback(null, response.body.ip); // pass IP to callback
  });
};

const fetchMyCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;

  needle.get(url, (error, response, body) => {
    // handle network errors
    if (error) {
      callback(error, null); // Pass network error to callback
      return;
    }

    // Check the body for "success" to be true or false
    if (body.success === false) {
      const msg = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(msg), null);
      return;
    }

    // get latitude and longitude from the response
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude}); // Pass data to the callback
  });
};

module.exports = { fetchMyIP, fetchMyCoordsByIP };

