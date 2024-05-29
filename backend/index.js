const { Client } = require("pg");
const fs = require("fs");
// const clipboard = require("clipboard");

const config = {
  user: "admin",
  password: "WAT499er!",
  // host: "10.34.3.86",
  host: "10.34.3.93",
  database: "raritan",
  port: 5432,
};

let newQ =
  'SELECT a."Make", a."ModelName" AS "Model", a."RUHeight" ,a."Height", a."Width",a."Depth",a."Class",a."Subclass", a."Mounting", a."DataPortsCount", a."PowerPortsCount" FROM odbc."dcModels" a join "dcModelObjectTypes" b on b."ModelName" = a."ModelName"';

let query = newQ;
const client = new Client(config);

async function main() {
  try {
    await client.connect();
    console.log("Connected to database");

    const result = await client.query(query);
    console.log("Querying database");

    let jsonResult = JSON.stringify(result);
    fs.writeFileSync("data.json", jsonResult);

    client.end();
  } catch (err) {
    console.error("Error:", err);
    client.end();
  }
}

const PORT = process.env.PORT || 4100;
const express = require("express");
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  main();
});
