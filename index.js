const { fetchMyIP } = require('./iss');
const { fetchMyCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

const IP = "216.71.199.190";

fetchMyCoordsByIP(IP, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("Valid IP - Coordinates", data);
});

