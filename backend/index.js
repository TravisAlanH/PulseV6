process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const app = express();

app.listen(3000, () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YWRtaW46c3VuYmlyZA==");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://10.34.3.86/api/v2/dcimoperations/search/makes/hp", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  console.log("Server running on port 3000");
});
