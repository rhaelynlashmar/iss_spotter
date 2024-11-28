// iss_promised.js
const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
  .then((response) => {
    const body = response.body; // retrieve the body value from the response object
    const ip = body.ip; // retrieve the ip from the body object
    return ip;
  });
};

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(ip) {
  const url = `http://ipwho.is/${ip}`;

  return needle('get', url)
  .then((response) => {
    const body = response.body; // retrieve the body value from the response object
    const latitude = body.latitude; // retrieve latitude from body
    const longitude = body.longitude; // retrieve longitude from body
    return {latitude, longitude};
  });
};

const fetchISSFlyOverTimes = function(coords) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  return needle('get', url)
  .then((response) => {
    const body = response.body; // retrieve the body value from the response object
    const passes = body.response;
    return passes;
  });
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then( (ip) => fetchCoordsByIP(ip) )
  .then( (coordinates) => fetchISSFlyOverTimes(coordinates) )
  .then( (passtimes) => { 
    return passtimes 
  });

};

module.exports = { nextISSTimesForMyLocation  };