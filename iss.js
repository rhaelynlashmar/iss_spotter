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

};

module.exports = { fetchMyIP, fetchMyCoordsByIP };

