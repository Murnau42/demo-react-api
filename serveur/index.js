// import express (after npm install express)
const express = require("express");
const cors = require("cors");
// create new express app and save it as "app"
const app = express();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "citationsdb",
});

// server configuration
const PORT = 8080;

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

//authorise les cross-origin request
app.use(cors());

// create a route for the app
app.get("/", (req, res) => {
  res.send({ citation: "Les baobabs ne sont pas des arbustes." });
});

// Citation aléotoire
app.get("/surprise", (req, res) => {
  var reponseJSON = {}
  connection.query(
    "SELECT citation FROM citations ORDER BY RAND () LIMIT 1",
    (err, resultatQuery) => {
      if (err) throw err;
      reponseJSON = JSON.stringify(resultatQuery);
      console.log("Data received from Db:");
      console.log(reponseJSON);
      res.send(reponseJSON);
    }
  );

});

app.get("/json", (req, res) => {
  res.send({
    citations: ["Les baobabs ne sont pas des arbustes", "Hello World"],
  });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});


