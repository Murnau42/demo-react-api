// import express (after npm install express)
const express = require("express");
const cors = require("cors");
// create new express app and save it as "app"
const app = express();
const bodyParser = require("body-parser");

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

//Traduit le corp de la réponse en objet json
app.use(bodyParser.json());


// create a route for the app
app.get("/", (req, res) => {
  res.send({ citation: "Les baobabs ne sont pas des arbustes." });
});

/**
 * Retourne une citation aléatoire
 * */
app.get("/random", (req, res) => {
  var reponseJSON = {};
  connection.query(
    "SELECT citation FROM citations ORDER BY RAND () LIMIT 1",
    (err, resultatQuery) => {
      if (err) throw err;
      reponseJSON = JSON.stringify(resultatQuery);
      // console.log("Data received from Db:");
      //console.log(reponseJSON);
      res.send(reponseJSON);
    }
  );
});

/**
 * Retour la dernière citation ajoutée dans la BD
 * */
app.get("/latest", (req, res) => {
  var reponseJSON = {};
  connection.query(
    "SELECT citation FROM citations ORDER BY id_citation DESC LIMIT 1;",
    (err, resultatQuery) => {
      if (err) throw err;
      reponseJSON = JSON.stringify(resultatQuery);
      res.send(reponseJSON);
    }
  );
});

/**
 * Ajoute une citation dans la BD
 * */
app.post("/create", function (req, res) {
  console.log(req.body);
  var data = req.body;
  connection.query(
    "INSERT INTO citations set ?",
    data,
    (err, resultat) => {
      if (err) res.send(err);
      res.status(200).send("OK");
    }
  );
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
