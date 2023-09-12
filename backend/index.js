const axios = require("axios");
const express = require("express");
const app = express();
const https = require("https"); // Import the 'https' module

app.use(express.json());

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  // Set NODE_TLS_REJECT_UNAUTHORIZED to 0 to disable SSL certificate verification
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let config = {
    method: "get",
    maxBodyLength: 10,
    url: "https://10.34.3.86/api/v2/dcimoperations/search/makes/hp", // Use HTTPS
    headers: {
      Authorization: "Basic YWRtaW46c3VuYmlyZA==",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Disable SSL certificate verification
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
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
});

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
