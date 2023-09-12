const axios = require("axios");
const express = require("express");
const app = express();
const https = require("https"); // Import the 'https' module
const { Client } = require("pg");

app.use(express.json());

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const config = {
    user: "admin",
    password: "WAT499er!",
    host: "10.34.3.86",
    database: "raritan",
    port: 5432, // Replace with your PostgreSQL port if it's different
  };
  const query = 'SELECT "Make" from odbc."dcModels"';
  const client = new Client(config);
  // client.connect();
  // console log if connected
  if (client.connect()) {
    console.log("Connected to database");
  }

  client.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      client.end();
      return;
    }
    client.end();
    let data = result.rows.splice(0, 1);
    const jsonResult = JSON.stringify(data);
    console.log(jsonResult);
    // res.end(jsonResult);
  });
});
////////////////////
// Set NODE_TLS_REJECT_UNAUTHORIZED to 0 to disable SSL certificate verification
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// let config = {
//   method: "get",
//   maxBodyLength: 10,
//   url: "https://10.34.3.86/api/v2/dcimoperations/search/makes/hp", // Use HTTPS
//   headers: {
//     Authorization: "Basic YWRtaW46c3VuYmlyZA==",
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   // Disable SSL certificate verification
//   httpsAgent: new https.Agent({ rejectUnauthorized: false }),
// };
// console.log("Test");
// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//     // res.end(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// let config = {
//   method: "get",
//   maxBodyLength: Infinity,
//   url: "https://10.34.3.86/api/v2/dcimoperations/search/makes/hp",
//   headers: {
//     Authorization: "Basic YWRtaW46c3VuYmlyZA==",
//   },
// };

// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
////////////////////////
// app.get("/api", (req, res) => {
//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "https://10.34.3.86/api/v2/dcimoperations/search/makes/hp",
//     headers: {
//       Authorization: "Basic YWRtaW46c3VuYmlyZA==",
//     },
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
