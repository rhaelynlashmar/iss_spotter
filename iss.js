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
  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null); // if error occurs, pass it to the callback
      return;
    }
  });


}

module.exports = { fetchMyIP };

